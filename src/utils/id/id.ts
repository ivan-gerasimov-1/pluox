import { Id } from '@modules/types';
import { customAlphabet } from 'nanoid';

const ALPHABET =
	'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const LENGTH = 14;

let nanoId = customAlphabet(ALPHABET, LENGTH);

export function generateId(): Id {
	return nanoId();
}
