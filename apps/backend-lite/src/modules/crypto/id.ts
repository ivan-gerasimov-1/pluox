import { randomBytes } from 'node:crypto';

export function generateId(prefix: string = 'id', length: number = 7): string {
	return `${prefix}${randomBytes(length).toString('hex')}`;
}
