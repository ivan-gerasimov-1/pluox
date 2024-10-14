import { randomBytes, scryptSync as scrypt } from 'node:crypto';

export function createPasswordHash(password: string): string {
	let passwordHash = hashPassword(password);

	return passwordHash;
}

export function comparePasswordHash(
	password: string,
	passwordHashWithSalt: string,
): boolean {
	let { salt } = splitPasswordHash(passwordHashWithSalt);

	let passwordHash = hashPassword(password, {
		salt,
	});

	return passwordHash === passwordHashWithSalt;
}

function hashPassword(password: string, options?: { salt: string }): string {
	let salt = options?.salt || randomBytes(16).toString('hex');
	let passwordHash = scrypt(password, salt, 64).toString('hex');

	return joinPasswordHashWithSalt(passwordHash, salt);
}

function splitPasswordHash(passwordHashWithSalt: string): {
	salt: string;
	hash: string;
} {
	let [salt, hash] = passwordHashWithSalt.split(':');

	return {
		salt,
		hash,
	};
}

function joinPasswordHashWithSalt(hash: string, salt: string): string {
	return `${salt}:${hash}`;
}
