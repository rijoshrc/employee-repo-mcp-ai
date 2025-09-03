import { randomBytes, createCipher, createDecipher } from "crypto";

const ENCRYPTION_KEY =
  process.env.SESSION_ENCRYPTION_KEY || randomBytes(32).toString("hex");
const ALGORITHM = "aes-256-cbc"; // Using CBC instead of GCM for better compatibility

export function encrypt(text: string): string {
  const iv = randomBytes(16);
  const cipher = createCipher(ALGORITHM, ENCRYPTION_KEY);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  // Combine IV and encrypted data
  return `${iv.toString("hex")}:${encrypted}`;
}

export function decrypt(encryptedData: string): string {
  const [ivHex, encrypted] = encryptedData.split(":");

  if (!ivHex || !encrypted) {
    throw new Error("Invalid encrypted data format");
  }

  const iv = Buffer.from(ivHex, "hex");
  const decipher = createDecipher(ALGORITHM, ENCRYPTION_KEY);
  decipher.setAutoPadding(true);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

export function encryptSession(sessionData: any): string {
  const jsonString = JSON.stringify(sessionData);
  return encrypt(jsonString);
}

export function decryptSession(encryptedSession: string): any {
  const decrypted = decrypt(encryptedSession);
  return JSON.parse(decrypted);
}
