import type { Id } from '@root/core/domain/types';

export class CategoryNotFoundError extends Error {
	constructor(id: Id) {
		super(`Category with id ${id} not found`);
	}
}
