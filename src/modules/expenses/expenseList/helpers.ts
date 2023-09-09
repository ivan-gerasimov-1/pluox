import type { TExpense } from '@domain/expense/types';

export function groupExpenseListByDay(expenseList: TExpense[]) {
	let groups: Record<
		string,
		{
			date: string;
			items: TExpense[];
		}
	> = {};

	for (let expense of expenseList) {
		/**
		 * @todo remove backward compatibility
		 */
		let datetime = expense.date || expense.dateCreated;
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

	return groups;
}
