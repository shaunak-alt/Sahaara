"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import JSZip from "jszip";
import styles from "./EvidenceLocker.module.css";
import {
  decodeSalt,
  deriveKey,
  encryptData,
  decryptData,
  encodeSalt,
  initDB,
  storageKeys
} from "../../lib/locker/crypto-utils";
import type { EvidenceItem, EvidenceType, StoredEvidenceRecord } from "../../types/locker";
import { useTranslations } from "../i18n/useTranslations";
const DEFAULT_MIME_TYPE = "application/octet-stream";

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

type LockerIconProps = {
  className?: string;
};

function LockIcon({ className }: LockerIconProps) {
  return (
    <svg className={className} width="32" height="32" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 10V7a5 5 0 0 1 10 0v3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect
        x="5"
        y="10"
        width="14"
        height="11"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
      />
      <circle cx="12" cy="15" r="1.2" fill="currentColor" />
      <path d="M12 16.2v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function UnlockIcon({ className }: LockerIconProps) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M16 10V7a4 4 0 0 0-7.6-1.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect
        x="5"
        y="10"
        width="14"
        height="11"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
      />
      <circle cx="12" cy="15" r="1.2" fill="currentColor" />
      <path d="M12 16.2v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function NoteIcon({ className }: LockerIconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 3h8l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M15 3v4h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ImageIcon({ className }: LockerIconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="9" cy="9" r="1.4" fill="currentColor" />
      <path d="M5.5 18l5-6 3.5 4.5L17 13l3 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VideoIcon({ className }: LockerIconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="5" width="12" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16 9l4-3v12l-4-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AudioIcon({ className }: LockerIconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8l7-3v8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 8v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function DocumentIcon({ className }: LockerIconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 13h7M9 17h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function EvidenceTypeIcon({ type, className }: { type: EvidenceType; className?: string }) {
  switch (type) {
    case "image":
      return <ImageIcon className={className} />;
    case "video":
      return <VideoIcon className={className} />;
    case "audio":
      return <AudioIcon className={className} />;
    case "document":
      return <DocumentIcon className={className} />;
    case "note":
    default:
      return <NoteIcon className={className} />;
  }
}

function TrashIcon({ className }: LockerIconProps) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 7h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10 11v6M14 11v6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M7 7l1 12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l1-12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DownloadIcon({ className }: LockerIconProps) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3v12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8 11l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M5 19h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

async function getAllRecords(): Promise<StoredEvidenceRecord[]> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("evidence", "readonly");
    const store = tx.objectStore("evidence");
    const request = store.getAll();

    request.onsuccess = () => {
      resolve((request.result ?? []) as StoredEvidenceRecord[]);
    };

    request.onerror = () => {
      reject(request.error ?? new Error("Failed to read evidence records"));
    };
  });
}

async function saveRecord(record: StoredEvidenceRecord): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("evidence", "readwrite");
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("Failed to store encrypted evidence"));

    tx.objectStore("evidence").put(record);
  });
}

async function deleteRecord(id: string): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("evidence", "readwrite");
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("Failed to delete evidence"));

    tx.objectStore("evidence").delete(id);
  });
}

export function EvidenceLocker() {
  const t = useTranslations();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [cryptoKey, setCryptoKey] = useState<CryptoKey | null>(null);
  const [items, setItems] = useState<EvidenceItem[]>([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [hasExistingVault, setHasExistingVault] = useState(false);

  const noteTitlePrefix = t("locker.noteTitlePrefix");
  const supportHint = t("locker.supportHint");

  const lockedCopy = useMemo(
    () => ({
      title: t("locker.locked.title"),
      copy: t("locker.locked.copy"),
      passwordExisting: t("locker.locked.passwordExisting"),
      passwordNew: t("locker.locked.passwordNew"),
      decrypting: t("locker.locked.decrypting"),
      unlockButton: t("locker.locked.unlockButton"),
      createUnlockButton: t("locker.locked.createUnlockButton")
    }),
    [t]
  );

  const feedbackCopy = useMemo(
    () => ({
      unlockFailed: t("locker.feedback.unlockFailed"),
      setupFailed: t("locker.feedback.setupFailed"),
      unlockRequiredNote: t("locker.feedback.unlockRequiredNote"),
      unlockRequiredFile: t("locker.feedback.unlockRequiredFile"),
      noteSaved: t("locker.feedback.noteSaved"),
      noteError: t("locker.feedback.noteError"),
      fileSaved: t("locker.feedback.fileSaved"),
      fileError: t("locker.feedback.fileError"),
      deleteSuccess: t("locker.feedback.deleteSuccess"),
      deleteError: t("locker.feedback.deleteError"),
      exportReady: t("locker.feedback.exportReady"),
      exportError: t("locker.feedback.exportError")
    }),
    [t]
  );

  const unlockedCopy = useMemo(
    () => ({
      heading: t("locker.unlocked.heading"),
      lockAction: t("locker.unlocked.lockAction"),
      notePlaceholder: t("locker.unlocked.notePlaceholder"),
      saveButton: t("locker.unlocked.saveButton"),
      uploadTitle: t("locker.unlocked.uploadTitle"),
      chooseFiles: t("locker.unlocked.chooseFiles"),
      emptyState: t("locker.unlocked.emptyState"),
      downloadNote: t("locker.unlocked.downloadNote"),
      downloadFile: t("locker.unlocked.downloadFile"),
      downloadAll: t("locker.unlocked.downloadAll"),
      downloadAllBusy: t("locker.unlocked.downloadAllBusy"),
      deleteNote: t("locker.unlocked.deleteNote"),
      deleteFile: t("locker.unlocked.deleteFile")
    }),
    [t]
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    setHasExistingVault(Boolean(window.localStorage.getItem(storageKeys.SALT)));
  }, []);

  const sortedItems = useMemo(
    () => [...items].sort((a, b) => b.timestamp - a.timestamp),
    [items]
  );

  const createRecordId = () => {
    if (typeof window !== "undefined" && typeof window.crypto !== "undefined" && "randomUUID" in window.crypto) {
      return window.crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  };

  const inferEvidenceType = (file: File): Exclude<EvidenceType, "note"> => {
    const mime = file.type.toLowerCase();
    if (mime.startsWith("image/")) {
      return "image";
    }
    if (mime.startsWith("video/")) {
      return "video";
    }
    if (mime.startsWith("audio/")) {
      return "audio";
    }

    const extension = file.name.toLowerCase().split(".").pop();
    if (!extension) {
      return "document";
    }

    const documentExtensions = ["pdf", "doc", "docx", "txt", "rtf", "odt", "xlsx", "xls", "csv", "ppt", "pptx"];
    if (documentExtensions.includes(extension)) {
      return "document";
    }

    return "document";
  };

  const formatBytes = (bytes: number | undefined) => {
    if (!bytes || bytes <= 0) {
      return "0 B";
    }

    const units = ["B", "KB", "MB", "GB", "TB"] as const;
    const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    const value = bytes / 1024 ** exponent;
    const precision = value >= 10 || exponent === 0 ? 0 : 1;
    return `${value.toFixed(precision)} ${units[exponent]}`;
  };

  const cloneToArrayBuffer = (bytes: Uint8Array): ArrayBuffer => {
    const { buffer, byteOffset, byteLength } = bytes;
    if (buffer instanceof ArrayBuffer) {
      return buffer.slice(byteOffset, byteOffset + byteLength);
    }

    const copy = new Uint8Array(byteLength);
    copy.set(bytes);
    return copy.buffer;
  };

  const sanitizeFileName = (raw: string, fallback: string): string => {
    const normalized = raw
      .normalize("NFKD")
      .replace(/[^a-zA-Z0-9._-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    return normalized || fallback;
  };

  const ensureUniqueName = (baseName: string, used: Set<string>): string => {
    if (!used.has(baseName)) {
      used.add(baseName);
      return baseName;
    }

    const dotIndex = baseName.lastIndexOf(".");
    const stem = dotIndex > 0 ? baseName.slice(0, dotIndex) : baseName;
    const extension = dotIndex > 0 ? baseName.slice(dotIndex) : "";
    let counter = 2;
    let candidate = `${stem}-${counter}${extension}`;

    while (used.has(candidate)) {
      counter += 1;
      candidate = `${stem}-${counter}${extension}`;
    }

    used.add(candidate);
    return candidate;
  };

  const handleUnlock = async () => {
    if (!password) {
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      let saltValue = window.localStorage.getItem(storageKeys.SALT);
      let saltBytes: Uint8Array;

      if (!saltValue) {
        saltBytes = window.crypto.getRandomValues(new Uint8Array(16));
        window.localStorage.setItem(storageKeys.SALT, encodeSalt(saltBytes));
        setHasExistingVault(true);
      } else {
        saltBytes = decodeSalt(saltValue);
      }

      const key = await deriveKey(password, saltBytes);
      const encryptedRecords = await getAllRecords();

      const decrypted: EvidenceItem[] = [];
      for (const record of encryptedRecords) {
        const encoding = record.encoding ?? "utf8";

        if (record.type === "note") {
          if (encoding === "binary") {
            const bytes = await decryptData(record.cipherText, record.iv, key, "bytes");
            const content = textDecoder.decode(bytes);
            decrypted.push({
              id: record.id,
              type: "note",
              title: record.title,
              content,
              timestamp: record.timestamp
            });
          } else {
            const content = await decryptData(record.cipherText, record.iv, key, "text");
            decrypted.push({
              id: record.id,
              type: "note",
              title: record.title,
              content,
              timestamp: record.timestamp
            });
          }
          continue;
        }

        if (encoding === "binary") {
          const bytes = await decryptData(record.cipherText, record.iv, key, "bytes");
          decrypted.push({
            id: record.id,
            type: record.type,
            title: record.title,
            timestamp: record.timestamp,
            fileName: record.fileName ?? record.title,
            mimeType: record.mimeType ?? DEFAULT_MIME_TYPE,
            size: record.size ?? bytes.byteLength,
            content: bytes
          });
        } else {
          const textContent = await decryptData(record.cipherText, record.iv, key, "text");
          const bytes = textEncoder.encode(textContent);
          decrypted.push({
            id: record.id,
            type: record.type,
            title: record.title,
            timestamp: record.timestamp,
            fileName: record.fileName ?? record.title,
            mimeType: record.mimeType ?? DEFAULT_MIME_TYPE,
            size: record.size ?? bytes.byteLength,
            content: bytes
          });
        }
      }

      setCryptoKey(key);
      setItems(decrypted);
      setIsUnlocked(true);
      setFeedback(null);
    } catch (error) {
      console.error("Failed to unlock vault", error);
      setFeedback(hasExistingVault ? feedbackCopy.unlockFailed : feedbackCopy.setupFailed);
      setCryptoKey(null);
      setIsUnlocked(false);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async () => {
    if (!cryptoKey) {
      setFeedback(feedbackCopy.unlockRequiredNote);
      return;
    }

    const trimmed = newNote.trim();
    if (!trimmed) {
      return;
    }

    try {
      const timestamp = Date.now();
      const id = createRecordId();
      const title = `${noteTitlePrefix} ${new Date(timestamp).toLocaleDateString()}`;
      const encrypted = await encryptData(trimmed, cryptoKey);
      const cipherBytes = encrypted.cipherText.slice();
      const ivBytes = encrypted.iv.slice();
      const cipherStoreBuffer = cloneToArrayBuffer(cipherBytes);
      const ivStoreBuffer = cloneToArrayBuffer(ivBytes);

      const record: StoredEvidenceRecord = {
        id,
        type: "note",
        title,
        timestamp,
        cipherText: cipherStoreBuffer,
        iv: ivStoreBuffer,
        encoding: "utf8"
      };

      await saveRecord(record);
      setItems(previous => [...previous, { id, type: "note", title, content: trimmed, timestamp }]);
      setNewNote("");
      setFeedback(feedbackCopy.noteSaved);
    } catch (error) {
      console.error("Failed to save encrypted note", error);
      setFeedback(feedbackCopy.noteError);
    }
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!cryptoKey) {
      setFeedback(feedbackCopy.unlockRequiredFile);
      event.target.value = "";
      return;
    }

    const fileList = event.target.files;
    if (!fileList || fileList.length === 0) {
      return;
    }

    try {
      const newItems: EvidenceItem[] = [];
      for (const file of Array.from(fileList)) {
        const buffer = await file.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        const encrypted = await encryptData(bytes, cryptoKey);
        const cipherBuffer = cloneToArrayBuffer(encrypted.cipherText);
        const ivBuffer = cloneToArrayBuffer(encrypted.iv);

        const timestamp = Date.now();
        const id = createRecordId();
        const type = inferEvidenceType(file);

        const record: StoredEvidenceRecord = {
          id,
          type,
          title: file.name,
          timestamp,
          cipherText: cipherBuffer,
          iv: ivBuffer,
          encoding: "binary",
          mimeType: file.type || undefined,
          fileName: file.name,
          size: file.size
        };

        await saveRecord(record);

        newItems.push({
          id,
          type,
          title: file.name,
          timestamp,
          fileName: file.name,
          mimeType: file.type || DEFAULT_MIME_TYPE,
          size: file.size,
          content: bytes
        });
      }

      setItems(previous => [...previous, ...newItems]);
      setFeedback(feedbackCopy.fileSaved);
    } catch (error) {
      console.error("Failed to store encrypted file", error);
      setFeedback(feedbackCopy.fileError);
    } finally {
      event.target.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteRecord(id);
      setItems(previous => previous.filter(item => item.id !== id));
      setFeedback(feedbackCopy.deleteSuccess);
    } catch (error) {
      console.error("Failed to delete encrypted note", error);
      setFeedback(feedbackCopy.deleteError);
    }
  };

  const handleDownload = (item: EvidenceItem) => {
    const anchor = document.createElement("a");
    if (item.type === "note") {
      const blob = new Blob([item.content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      anchor.href = url;
      anchor.download = `${item.title.replace(/\s+/g, "-")}.txt`;
      anchor.click();
      URL.revokeObjectURL(url);
      return;
    }

    const blob = new Blob([cloneToArrayBuffer(item.content)], { type: item.mimeType });
    const url = URL.createObjectURL(blob);
    anchor.href = url;
    anchor.download = item.fileName;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = async () => {
    if (sortedItems.length === 0 || isExporting) {
      return;
    }

    setIsExporting(true);
    setFeedback(null);

    try {
      const zip = new JSZip();
      const notesFolder = zip.folder("notes");
      const filesFolder = zip.folder("files");
      const usedNoteNames = new Set<string>();
      const usedFileNames = new Set<string>();

      for (const item of sortedItems) {
        if (item.type === "note") {
          const baseName = sanitizeFileName(item.title, "note");
          const uniqueName = ensureUniqueName(`${baseName}.txt`, usedNoteNames);
          (notesFolder ?? zip).file(uniqueName, item.content);
          continue;
        }

        const baseName = sanitizeFileName(item.fileName ?? item.title, "evidence");
        const uniqueName = ensureUniqueName(baseName, usedFileNames);
        (filesFolder ?? zip).file(uniqueName, item.content, { binary: true });
      }

      const archive = await zip.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } });
      const url = URL.createObjectURL(archive);
      const anchor = document.createElement("a");
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      anchor.href = url;
      anchor.download = `sahaara-locker-${timestamp}.zip`;
      anchor.click();
      URL.revokeObjectURL(url);
      setFeedback(feedbackCopy.exportReady);
    } catch (error) {
      console.error("Failed to export encrypted locker", error);
      setFeedback(feedbackCopy.exportError);
    } finally {
      setIsExporting(false);
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setCryptoKey(null);
    setItems([]);
    setFeedback(null);
    setPassword("");
  };

  if (!isUnlocked) {
    return (
      <div className={styles.lockedState}>
        <div className={styles.lockedCard}>
          <div className={styles.iconBadge}>
            <LockIcon />
          </div>
          <h2 className={styles.lockedHeadline}>{lockedCopy.title}</h2>
          <p className={styles.lockedCopy}>{lockedCopy.copy}</p>
          <div className={styles.lockedForm}>
            <input
              type="password"
              autoComplete="current-password"
              className={styles.lockedInput}
              placeholder={hasExistingVault ? lockedCopy.passwordExisting : lockedCopy.passwordNew}
              value={password}
              onChange={event => setPassword(event.target.value)}
              disabled={loading}
            />
            <button
              type="button"
              className={styles.unlockButton}
              onClick={handleUnlock}
              disabled={!password || loading}
            >
              {loading ? lockedCopy.decrypting : hasExistingVault ? lockedCopy.unlockButton : lockedCopy.createUnlockButton}
            </button>
            {feedback ? <p className={styles.feedback}>{feedback}</p> : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.lockerRoot}>
      <div className={styles.vaultHeader}>
        <h2 className={styles.vaultTitle}>
          <UnlockIcon />
          {unlockedCopy.heading}
        </h2>
        <div className={styles.vaultHeaderActions}>
          {sortedItems.length > 0 ? (
            <button
              type="button"
              className={styles.downloadAllButton}
              onClick={handleDownloadAll}
              disabled={isExporting}
            >
              <DownloadIcon /> {isExporting ? unlockedCopy.downloadAllBusy : unlockedCopy.downloadAll}
            </button>
          ) : null}
          <button type="button" onClick={handleLock} className={styles.lockLink}>
            {unlockedCopy.lockAction}
          </button>
        </div>
      </div>

      <div className={styles.newNoteCard}>
        <textarea
          className={styles.noteTextarea}
          value={newNote}
          placeholder={unlockedCopy.notePlaceholder}
          onChange={event => setNewNote(event.target.value)}
        />
        <div className={styles.noteActions}>
          <button type="button" className={styles.saveButton} onClick={handleAddNote} disabled={!newNote.trim()}>
            <NoteIcon /> {unlockedCopy.saveButton}
          </button>
        </div>
      </div>

      <div className={`${styles.newNoteCard} ${styles.uploadCard}`}>
        <p className={styles.uploadCopy}>{unlockedCopy.uploadTitle}</p>
        <label className={styles.uploadLabel}>
          <input
            type="file"
            multiple
            className={styles.uploadInput}
            onChange={handleFileUpload}
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt,.rtf,.odt,.xls,.xlsx,.csv,.ppt,.pptx"
          />
          {unlockedCopy.chooseFiles}
        </label>
        <p className={styles.uploadHint}>{supportHint}</p>
      </div>

      {feedback ? <p className={styles.feedback}>{feedback}</p> : null}

      <div className={styles.itemsList}>
        {sortedItems.length === 0 ? (
          <p className={styles.emptyState}>{unlockedCopy.emptyState}</p>
        ) : (
          sortedItems.map(item => (
            <div key={item.id} className={styles.itemCard}>
              <div>
                <div className={styles.itemMeta}>
                  <EvidenceTypeIcon type={item.type} className={styles.itemIcon} />
                  <span className={styles.itemTitle}>{item.title}</span>
                  <span className={styles.itemDate}>{new Date(item.timestamp).toLocaleString()}</span>
                </div>
                {item.type === "note" ? (
                  <p className={styles.itemContent}>{item.content}</p>
                ) : (
                  <div className={styles.fileDetails}>
                    <span className={styles.fileName}>{item.fileName}</span>
                    <span className={styles.fileMeta}>
                      {item.mimeType} · {formatBytes(item.size)}
                    </span>
                  </div>
                )}
              </div>
              <div className={styles.itemActions}>
                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={() => handleDownload(item)}
                  aria-label={item.type === "note" ? unlockedCopy.downloadNote : unlockedCopy.downloadFile}
                >
                  <DownloadIcon />
                </button>
                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={() => handleDelete(item.id)}
                  aria-label={item.type === "note" ? unlockedCopy.deleteNote : unlockedCopy.deleteFile}
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EvidenceLocker;
