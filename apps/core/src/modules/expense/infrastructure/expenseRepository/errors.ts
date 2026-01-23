import type { Id } from '@pluox/core/src/domain/types';

export class ExpenseNotFoundError extends Error {
	constructor(id: Id) {
		super(`Expense "${id}" is not found`);
	}
}
