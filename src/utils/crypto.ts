// Web Crypto API wrapper for local storage encryption of API keys
const SALT = new Uint8Array([73, 115, 73, 116, 76, 101, 103, 105, 116, 45, 83, 101, 99, 117, 114, 101]);

async function getDerivedKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(window.location.origin + navigator.userAgent),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: SALT,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptSecret(plainText: string): Promise<string> {
  if (!plainText) return '';
  try {
    const key = await getDerivedKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(plainText);

    const ciphertext = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encoded
    );

    const combined = new Uint8Array(iv.length + ciphertext.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(ciphertext), iv.length);

    return btoa(String.fromCharCode(...combined));
  } catch (err) {
    console.warn('Crypto fallback to base64 encoding:', err);
    return btoa(plainText);
  }
}

export async function decryptSecret(encryptedBase64: string): Promise<string> {
  if (!encryptedBase64) return '';
  try {
    const binary = atob(encryptedBase64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    const iv = bytes.slice(0, 12);
    const ciphertext = bytes.slice(12);
    const key = await getDerivedKey();

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      ciphertext
    );

    return new TextDecoder().decode(decrypted);
  } catch (err) {
    try {
      return atob(encryptedBase64);
    } catch {
      return '';
    }
  }
}
