import type { Id } from '@root/core/domain/types';
import type { IExpense } from '@root/core/modules/expense/domain/expenseEntity/types';
import type {
	IExpenseFindOptions,
	IExpenseRepository,
} from '@root/core/modules/expense/domain/expenseRepository/types';
import type { IExpenseDataSource } from '@root/core/modules/expense/infrastructure/expenseDataSource/types';
import type { IExpenseMapper } from '@root/core/modules/expense/infrastructure/expenseMapper/types';

export class ExpenseRepository implements IExpenseRepository {
	constructor(
		private readonly dataSource: IExpenseDataSource,
		private readonly expenseMapper: IExpenseMapper,
	) {}

	public save(expense: IExpense): IExpense {
		let expenseDTO = this.expenseMapper.toDTO(expense);

		let newExpenseDTO = this.dataSource.save(expenseDTO);

		return this.expenseMapper.toEntity(newExpenseDTO);
	}

	public findMany(options?: IExpenseFindOptions) {
		let expenses = this.dataSource.findMany(options);

		return {
			items: expenses.items.map(this.expenseMapper.toEntity),
			total: expenses.total,
		};
	}

	public findById(id: Id): IExpense | null {
		let expense = this.dataSource.findById(id);

		if (expense === null) {
			return null;
		}

		return this.expenseMapper.toEntity(expense);
	}

	public remove(id: Id): IExpense | null {
		let expense = this.dataSource.remove(id);

		if (expense === null) {
			return null;
		}

		return this.expenseMapper.toEntity(expense);
	}
}
