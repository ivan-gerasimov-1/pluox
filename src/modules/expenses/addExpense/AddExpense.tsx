import { ECurrency } from '@core/infrastructure/currency/types';
import { createDateViewValue } from '@modules/expenses/addExpense/helpers/createDateViewValue';
import { ExpenseForm } from '@modules/expenses/expenseView/ExpenseForm';
import { useExpensesStore } from '@modules/expenses/expenses.store';

export function AddExpense() {
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
