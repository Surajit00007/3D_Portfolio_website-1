import { safeFetch } from "../../../config";

async function generateAESKey(password: string): Promise<CryptoKey> {
  const passwordBuffer = new TextEncoder().encode(password);
  const hashedPassword = await crypto.subtle.digest("SHA-256", passwordBuffer);
  return crypto.subtle.importKey(
    "raw",
    hashedPassword.slice(0, 32),
    { name: "AES-CBC" },
    false,
    ["encrypt", "decrypt"]
  );
}

export const decryptFile = async (
  url: string,
  password: string
): Promise<ArrayBuffer> => {
  try {
    const encryptedData = await safeFetch(url);
    if (!encryptedData) {
      throw new Error(`Failed to fetch ${url}`);
    }
    if (encryptedData.byteLength < 16) {
      throw new Error(`Invalid encrypted file: file too small (${encryptedData.byteLength} bytes)`);
    }
    const iv = new Uint8Array(encryptedData.slice(0, 16));
    const data = encryptedData.slice(16);
    const key = await generateAESKey(password);
    return crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, data);
  } catch (error) {
    console.error(`Error decrypting file ${url}:`, error);
    throw error;
  }
};
