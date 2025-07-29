import { ECurrency } from '@root/core/modules/currency/domain/types';
import { ExpenseForm } from '@root/presentation/web-ui/modules/expenses/components/expenseForm/expenseForm';
import { createDateViewValue } from '@root/presentation/web-ui/modules/expenses/components/expenseNew/helpers/createDateViewValue';
import { useCreateExpenseMutation } from '@root/presentation/web-ui/modules/expenses/expenses.query';

export function ExpenseNew() {
	let { mutate: createExpense } = useCreateExpenseMutation();

	/** @todo Make configurable */
	let defaultCurrency = ECurrency.RSD;

	return (
		<ExpenseForm
			onSubmit={createExpense}
			amount={0}
			currency={defaultCurrency}
			description=""
			category=""
			venue=""
			date={createDateViewValue()}
		/>
	);
}
