import "dotenv/config";
import crypto from "crypto";

// This generates a safe 32 byte key from any given secret key
const key = crypto.pbkdf2Sync(
  process.env.SECRET_KEY ?? "SECRET_KEY",
  "",
  100000,
  32,
  "sha256"
);

// Function to encrypt data
export function encrypt(text: string) {
  const iv = crypto.randomBytes(16); // Generate a 16-byte IV
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  // Return the IV and encrypted data as a single string
  return iv.toString("hex") + ":" + encrypted;
}

// Function to decrypt data
export function decrypt(encryptedData: string) {
  if (!encryptedData) return encryptedData;
  const [ivHex, encrypted] = encryptedData.split(":");
  const iv = Buffer.from(ivHex, "hex");
  if (iv.length !== 16) return encryptedData;
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
