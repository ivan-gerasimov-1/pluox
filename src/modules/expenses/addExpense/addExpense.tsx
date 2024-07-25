import { ECurrency } from '@core/infrastructure/currency/types';
import { createDateViewValue } from '@modules/expenses/addExpense/helpers/createDateViewValue';
import { ExpenseForm } from '@modules/expenses/expenseView/expenseForm';
import { useExpensesStore } from '@modules/expenses/expenses.store';

export function AddExpense() {
	let addExpense = useExpensesStore((state) => state.addExpense);

	/** @todo Make configurable */
	let defaultCurrency = ECurrency.RUB;

	return (
		<ExpenseForm
			onSubmit={addExpense}
			amount={0}
			currency={defaultCurrency}
			comment=""
			category=""
			date={createDateViewValue()}
		/>
	);
}
