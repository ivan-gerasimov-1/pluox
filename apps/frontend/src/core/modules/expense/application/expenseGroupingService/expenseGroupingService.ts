import type { TCategory } from '@/core/domain/types';

import type { TExpenseDTO } from '@/core/modules/expense/application/dto/expenseDTO';
import type {
	IExpenseGroupingService,
	TExpenseGroupByCategory,
	TExpenseGroupByDate,
} from '@/core/modules/expense/application/expenseGroupingService/types';

export class ExpenseGroupingService implements IExpenseGroupingService {
	public groupByDay(expenseList: TExpenseDTO[]): TExpenseGroupByDate[] {
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
			.sort((firstValue: string, secondValue: string): -1 | 0 | 1 => {
				let first = Number.parseInt(firstValue, 10);
				let second = Number.parseInt(secondValue, 10);

				if (first < second) {
					return 1;
				}

				if (first > second) {
					return -1;
				}

				return 0;
			})
			.reduce((state, value) => {
				state.push(groups[value]);

				return state;
			}, [] as TExpenseGroupByDate[]);
	}

	public groupByCategory(
		expenseList: TExpenseDTO[],
	): TExpenseGroupByCategory[] {
		let result: Record<TCategory, TExpenseGroupByCategory> = {};

		for (let expense of expenseList) {
			let category = expense.category ?? '—';

			if (!result[category]) {
				result[category] = {
					category,
					items: [],
				};
			}

			result[category].items.push(expense);
		}

		return Object.values(result);
	}
}
