import { customAlphabet } from 'nanoid';

const ALPHABET =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const LENGTH = 14;

let nanoId = customAlphabet(ALPHABET, LENGTH);

export type Id = string;

export function generateId(): Id {
  return nanoId();
}
