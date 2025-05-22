import { customAlphabet } from "nanoid";
const customNanoid = customAlphabet("0123456789");

export function generateAccountNumber() {
  return customNanoid(10);
}

export function generateCardNumber() {
  return customNanoid(16);
}

export function generateCVV() {
  return customNanoid(3);
}
