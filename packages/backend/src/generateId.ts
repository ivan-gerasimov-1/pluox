import { customAlphabet } from 'nanoid';

export function generateId(prefix: string = 'I'): string {
	const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 13);
	const nanoidPrefix = customAlphabet('123456789', 3);

	return `I${nanoidPrefix()}${nanoid()}`;
}

export function generateUserId(): string {
	return generateId('U');
}
