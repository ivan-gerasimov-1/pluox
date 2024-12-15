import type { IUseCase } from '@root/core/domain/types';
import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';

export type TExpenseGroupByDate = {
	date: string;
	items: TExpenseDTO[];
};

export interface IGroupExpenseByDateUseCase extends IUseCase {
	execute(expenses: TExpenseDTO[]): TExpenseGroupByDate[];
}

export class GroupExpenseByDateUseCase implements IGroupExpenseByDateUseCase {
	public execute(expenses: TExpenseDTO[]): TExpenseGroupByDate[] {
		return this.groupExpensesByDate(expenses);
	}

	private groupExpensesByDate(
		expenseList: TExpenseDTO[],
	): TExpenseGroupByDate[] {
		let groups: Record<string, TExpenseGroupByDate> = {};

		for (let expense of expenseList) {
			let datetime = expense.date;

			let [date] = datetime.split('T');
			let [year, month, day] = date.split('-');

			if (!groups[day]) {
				groups[day] = {
					date: [year, month, day].join('-'),
					items: [],
				};
			}

			groups[day].items.push(expense);
		}

		return Object.keys(groups)
			.sort((a: string, b: string): -1 | 0 | 1 => {
				const left = Number.parseInt(a, 10);
				const right = Number.parseInt(b, 10);

				if (left < right) {
					return 1;
				}

				if (left > right) {
					return -1;
				}

				return 0;
			})
			.reduce((state, value) => {
				state.push(groups[value]);

				return state;
			}, [] as TExpenseGroupByDate[]);
	}
}
