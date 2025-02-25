import { randomUUID } from 'node:crypto';

export function generatedUuid(): string {
	return randomUUID();
}
