export type EvidenceType = "note" | "image" | "video" | "audio" | "document";

export type NoteEvidenceItem = {
  id: string;
  type: "note";
  title: string;
  timestamp: number;
  content: string;
};

export type FileEvidenceItem = {
  id: string;
  type: Exclude<EvidenceType, "note">;
  title: string;
  timestamp: number;
  fileName: string;
  mimeType: string;
  size: number;
  content: Uint8Array;
};

export type EvidenceItem = NoteEvidenceItem | FileEvidenceItem;

export type StoredEvidenceRecord = {
  id: string;
  type: EvidenceType;
  title: string;
  timestamp: number;
  cipherText: ArrayBuffer;
  iv: ArrayBuffer;
  encoding: "utf8" | "binary";
  mimeType?: string;
  fileName?: string;
  size?: number;
};
