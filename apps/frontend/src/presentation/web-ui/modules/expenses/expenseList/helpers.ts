import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';

export function groupExpenseListByDay(expenseList: TExpenseDTO[]): Array<{
	date: string;
	items: TExpenseDTO[];
}> {
	let groups: Record<
		string,
		{
			date: string;
			items: TExpenseDTO[];
		}
	> = {};

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
		.reduce(
			(state, value) => {
				state.push(groups[value]);

				return state;
			},
			[] as Array<{
				date: string;
				items: TExpenseDTO[];
			}>,
		);
}
