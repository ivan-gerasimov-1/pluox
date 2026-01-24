import type { Id } from '@core/domain/types';

export class DuplicateItemError extends Error {
	constructor(id: Id) {
		super(`Item with id "${id}" already exists`);
	}
}

export class ItemNotFoundError extends Error {
	constructor(id: Id) {
		super(`Item with id "${id}" not found`);
	}
}
