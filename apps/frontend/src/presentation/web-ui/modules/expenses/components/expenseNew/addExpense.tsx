import { ECurrency } from '@/core/modules/currency/domain/types';

import { ExpenseForm } from '@/presentation/web-ui/modules/expenses/components/expenseForm/expenseForm';
import { createDateViewValue } from '@/presentation/web-ui/modules/expenses/components/expenseNew/helpers/createDateViewValue';
import { useExpenseCreateMutation } from '@/presentation/web-ui/modules/expenses/expenses.query';

export function ExpenseNew() {
	let { mutate: createExpense } = useExpenseCreateMutation();

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
