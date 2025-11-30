const ENC_ALGORITHM = "AES-GCM";
const PBKDF2_ITERATIONS = 210_000;
const KEY_LENGTH = 256;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const dbName = "sahaara-evidence-locker";
const storeName = "evidence";

let dbPromise: Promise<IDBDatabase> | null = null;

function assertClientEnvironment(): void {
  if (typeof window === "undefined" || typeof window.crypto === "undefined") {
    throw new Error("Crypto features are only available in the browser environment.");
  }
}

async function importPasswordKey(password: string): Promise<CryptoKey> {
  assertClientEnvironment();
  return window.crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
}

export async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const normalizedSalt = salt.slice();
  const baseKey = await importPasswordKey(password);
  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: normalizedSalt,
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256"
    },
    baseKey,
    {
      name: ENC_ALGORITHM,
      length: KEY_LENGTH
    },
    false,
    ["encrypt", "decrypt"]
  );
}

export type EncryptedPayload = {
  cipherText: Uint8Array;
  iv: Uint8Array;
};

type BufferInput = ArrayBuffer | ArrayBufferView;

function ensureArrayBuffer(data: BufferInput): ArrayBuffer {
  if (data instanceof ArrayBuffer) {
    return data;
  }

  if (ArrayBuffer.isView(data)) {
    const view = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    const copy = new Uint8Array(view.byteLength);
    copy.set(view);
    return copy.buffer;
  }

  throw new Error("Unsupported encrypted payload format");
}

type EncryptInput = string | BufferInput;

function toUint8Array(input: EncryptInput): Uint8Array {
  if (typeof input === "string") {
    return encoder.encode(input);
  }

  if (input instanceof ArrayBuffer) {
    return new Uint8Array(input.slice(0));
  }

  if (ArrayBuffer.isView(input)) {
    const view = new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
    const copy = new Uint8Array(view.byteLength);
    copy.set(view);
    return copy;
  }

  throw new Error("Unsupported encryption payload");
}

export async function encryptData(data: EncryptInput, key: CryptoKey): Promise<EncryptedPayload> {
  assertClientEnvironment();
  const normalized = toUint8Array(data);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const payload = ensureArrayBuffer(normalized);
  const cipherBuffer = await window.crypto.subtle.encrypt(
    {
      name: ENC_ALGORITHM,
      iv
    },
    key,
    payload
  );

  return {
    cipherText: new Uint8Array(cipherBuffer),
    iv
  };
}

type DecryptionFormat = "text" | "bytes";

export async function decryptData(cipherText: BufferInput, iv: BufferInput, key: CryptoKey): Promise<string>;
export async function decryptData(cipherText: BufferInput, iv: BufferInput, key: CryptoKey, format: "text"): Promise<string>;
export async function decryptData(cipherText: BufferInput, iv: BufferInput, key: CryptoKey, format: "bytes"): Promise<Uint8Array>;
export async function decryptData(
  cipherText: BufferInput,
  iv: BufferInput,
  key: CryptoKey,
  format: DecryptionFormat = "text"
): Promise<string | Uint8Array> {
  assertClientEnvironment();
  const cipherBuffer = ensureArrayBuffer(cipherText);
  const ivBuffer = new Uint8Array(ensureArrayBuffer(iv));

  const plainBuffer = await window.crypto.subtle.decrypt(
    {
      name: ENC_ALGORITHM,
      iv: ivBuffer
    },
    key,
    cipherBuffer
  );

  if (format === "bytes") {
    return new Uint8Array(plainBuffer);
  }

  return decoder.decode(plainBuffer);
}

export async function initDB(): Promise<IDBDatabase> {
  assertClientEnvironment();

  if (dbPromise) {
    return dbPromise;
  }

  dbPromise = new Promise((resolve, reject) => {
    const openRequest = window.indexedDB.open(dbName, 1);

    openRequest.onupgradeneeded = () => {
      const db = openRequest.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id" });
      }
    };

    openRequest.onsuccess = () => {
      const db = openRequest.result;
      db.onversionchange = () => {
        db.close();
      };
      resolve(db);
    };

    openRequest.onerror = () => {
      reject(openRequest.error ?? new Error("Unable to open evidence locker storage."));
    };
  });

  return dbPromise;
}

export async function closeDB(): Promise<void> {
  if (!dbPromise) {
    return;
  }

  const db = await dbPromise;
  db.close();
  dbPromise = null;
}

export const storageKeys = {
  SALT: "sahaara_salt"
} as const;

export function encodeSalt(bytes: Uint8Array): string {
  assertClientEnvironment();
  let binaryString = "";
  bytes.forEach(byte => {
    binaryString += String.fromCharCode(byte);
  });
  return window.btoa(binaryString);
}

export function decodeSalt(encoded: string): Uint8Array {
  assertClientEnvironment();
  const binary = window.atob(encoded);
  const output = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    output[i] = binary.charCodeAt(i);
  }
  return output;
}
