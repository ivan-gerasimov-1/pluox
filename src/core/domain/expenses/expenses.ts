import type { IExpense, TExpense } from '@domain/expense/types';
import { ExpenseNotFoundError } from '@domain/expenses/errors';
import type { IExpenses, TExpenses } from '@domain/expenses/types';
import type { Id } from '@domain/types';

export class Expenses implements IExpenses {
	#expenses: Map<Id, TExpense>;

	private constructor(expenses: TExpenses) {
		this.#expenses = new Map(Object.entries(expenses));
	}

	public static create(expenses: TExpenses): IExpenses {
		return new Expenses(expenses);
	}

	public add(expense: IExpense): this {
		this.#expenses.set(expense.id, expense.toObject());

		return this;
	}

	public get(): TExpenses;
	public get(id: Id): TExpense;
	public get(id?: Id): TExpenses | TExpense {
		if (id !== undefined) {
			return this.getOne('id');
		}

		return this.getAll();
	}

	public list(): TExpense[] {
		return Array.from(this.#expenses.values());
	}

	public getTotalAmount(): number {
		let total = 0;

		for (let [, operation] of this.#expenses) {
			total += operation.amount;
		}

		return total;
	}

	private getAll(): TExpenses {
		return Object.fromEntries(this.#expenses.entries());
	}

	private getOne(id: Id): TExpense {
		const expense = this.#expenses.get(id);

		if (expense === undefined) {
			throw new ExpenseNotFoundError(id);
		}

		return expense;
	}
}
