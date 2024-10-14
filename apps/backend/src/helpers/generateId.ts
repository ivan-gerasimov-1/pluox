import { customAlphabet } from 'nanoid';

export function generateId(prefix: string = 'I'): string {
	const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 13);
	const nanoidPrefix = customAlphabet('123456789', 3);

	return `${prefix}${nanoidPrefix()}${nanoid()}`;
}
