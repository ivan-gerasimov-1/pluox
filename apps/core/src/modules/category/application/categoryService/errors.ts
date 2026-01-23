import type { Id } from '@pluox/core/src/domain/types';

export class CategoryNotFoundError extends Error {
	constructor(id: Id) {
		super(`Category with id ${id} not found`);
	}
}
