import type { Id } from '@/core/domain/types';

export class CategoryNotFoundError extends Error {
	constructor(id: Id) {
		super(`Category with id ${id} not found`);
	}
}
