import type { Id } from '@/core/domain/types';

export class ExpenseNotFoundError extends Error {
	constructor(id: Id) {
		super(`Expense "${id}" is not found`);
	}
}
