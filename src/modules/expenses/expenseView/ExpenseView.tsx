import { ECurrency } from '@core/infrastructure/currency/types';
import type { TISODateString } from '@domain/types';
import { useExpensesStore } from '@modules/expenses';
import { ExpenseForm } from '@modules/expenses/expenseView/ExpenseForm';

export type TExpenseViewProps = {
	amount?: number;
	currency?: ECurrency;
	comment?: string;
	category?: string;
	date?: string;
};

export function ExpenseView(props: TExpenseViewProps) {
	let addExpense = useExpensesStore((state) => state.addExpense);
	let editExpense = useExpensesStore((state) => state.editExpense);

	/** @todo Not Implemented */
	let action: any;

	if (
		props.amount !== undefined &&
		props.currency !== undefined &&
		props.comment !== undefined &&
		props.category !== undefined &&
		props.date !== undefined
	) {
		action = editExpense;
	} else {
		action = addExpense;
	}

	return (
		<ExpenseForm
			onSubmit={action}
			amount={props.amount || 0}
			currency={props.currency || ECurrency.GEL}
			comment={props.comment || ''}
			category={props.category || ''}
			date={props.date || createDateViewValue()}
		/>
	);
}

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
