import type { IExpense } from '@root/core/modules/expense/domain/expenseEntity/types';
import type { IExpenseGroupingService } from '@root/core/modules/expense/domain/expenseGroupingService/types';
import type { TExpenseGroupByDate } from '@root/core/modules/expense/domain/types';

export class ExpenseGroupingService implements IExpenseGroupingService {
	public groupByDay(expenseList: IExpense[]): TExpenseGroupByDate[] {
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
