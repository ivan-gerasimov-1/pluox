import { ECurrency } from '@core/infrastructure/currency/types';
import type { TISODateString } from '@domain/types';
import { useExpensesStore } from '@modules/expenses';
import { ExpenseForm } from '@modules/expenses/expenseView/ExpenseForm';

function createDateViewValue(): TISODateString {
	const date = new Date();

	function format(value: number): string {
		if (value < 10) {
			return `0${value}`;
		}

		return `${value}`;
	}

	return `${date.getFullYear()}-${format(date.getMonth() + 1)}-${format(
		date.getDate(),
	)}T${format(date.getHours())}:${format(date.getMinutes())}`;
}

export function ExpenseView() {
	let addExpense = useExpensesStore((state) => state.addExpense);

	return (
		<ExpenseForm
			onSubmit={addExpense}
			amount={0}
			currency={ECurrency.GEL}
			comment=""
			category=""
			date={createDateViewValue()}
		/>
	);
}
