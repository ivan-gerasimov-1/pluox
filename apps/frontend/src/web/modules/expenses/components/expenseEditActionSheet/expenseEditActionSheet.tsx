import type { TExpenseDTO } from '@pluox/core/src/modules/expense/application/dto/expenseDTO';

import { createDateViewValue } from '@/web/modules/expenses/components/expenseCreate/helpers/createDateViewValue';
import { ExpenseForm } from '@/web/modules/expenses/components/expenseForm/expenseForm';
import { useExpenseUpdateMutation } from '@/web/modules/expenses/expenses.query';
import type { TDialogComponentProps } from '@/web/uiKit/dialog/core/types';

export function EditExpenseActionSheet({
	expense,
	close,
}: TDialogComponentProps<{ expense: TExpenseDTO }, void>) {
	let { mutate: updateExpense } = useExpenseUpdateMutation();

	return (
		<ExpenseForm
			onSubmit={(payload) =>
				updateExpense(
					{
						id: expense.id,
						payload,
					},
					{
						onSuccess() {
							close();
						},
					},
				)
			}
			amount={expense.amount}
			currency={expense.currency}
			description={expense.description}
			category={expense.category}
			venue={expense.venue}
			date={createDateViewValue(expense.date)}
		/>
	);
}
