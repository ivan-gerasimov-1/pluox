import { Id } from '@domain/types';

export class ExpenseNotFoundError extends Error {
	constructor(id: Id) {
		super(`Expense "${id}" is not found`);
	}
}
