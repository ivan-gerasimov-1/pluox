import {
	AppConfig,
	type IAppConfig,
} from '@core/infrastructure/appConfig/AppConfig';
import type { ECurrency } from '@core/infrastructure/currency/types';
import type { IExpense, TExpense } from '@domain/expense/types';
import { ExpenseNotFoundError } from '@domain/expenses/errors';
import type { IExpenses, TExpenses } from '@domain/expenses/types';
import {
	type IMonthlyAmountUseCase,
	MonthlyAmountUseCase,
} from '@domain/expenses/use-cases/monthly-amount-use-case';
import {
	type ITotalAmountUseCase,
	TotalAmountUseCase,
} from '@domain/expenses/use-cases/total-amount-use-case';
import type { Id } from '@domain/types';

export class Expenses implements IExpenses {
	readonly #expenses: Map<Id, TExpense>;
	readonly #totalAmountUseCase: ITotalAmountUseCase;
	readonly #monthlyAmountUseCase: IMonthlyAmountUseCase;

	readonly #defaultCurrency: ECurrency;

	private constructor(expenses: TExpenses) {
		this.#expenses = new Map(Object.entries(expenses));

		/**
		 * @todo Use DI instead of direct instantiation
		 */
		let appConfig: IAppConfig = AppConfig.create();
		this.#totalAmountUseCase = TotalAmountUseCase.create(this);
		this.#monthlyAmountUseCase = MonthlyAmountUseCase.create(this);

		this.#defaultCurrency = appConfig.currency;
	}

	public static create(expenses: TExpenses = {}): IExpenses {
		return new Expenses(expenses);
	}

	public add(expense: IExpense): this {
		this.#expenses.set(expense.id, Object.freeze(expense.toObject()));

		return this;
	}

	public get(): TExpenses;
	public get(id: Id): TExpense;
	public get(id?: Id): TExpenses | TExpense {
		if (id !== undefined) {
			return this.getOne(id);
		}

		return this.getAll();
	}

	public list(): TExpense[] {
		return Array.from(this.#expenses.values()).reverse();
	}

	public delete(id: Id): this {
		if (!this.#expenses.has(id)) {
			throw new ExpenseNotFoundError(id);
		}

		this.#expenses.delete(id);

		return this;
	}

	public getTotalAmount(): number {
		return this.#totalAmountUseCase.run(this.#defaultCurrency);
	}

	public getMonthlyAmount(): number {
		return this.#monthlyAmountUseCase.run(this.#defaultCurrency);
	}

	private getAll(): TExpenses {
		return Object.fromEntries(this.#expenses.entries());
	}

	/**
	 * @throws {ExpenseNotFoundError}
	 */
	private getOne(id: Id): TExpense {
		const expense = this.#expenses.get(id);

		if (expense === undefined) {
			throw new ExpenseNotFoundError(id);
		}

		return expense;
	}
}
