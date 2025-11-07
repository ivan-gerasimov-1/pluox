import type { TDialogComponentProps } from '@root/presentation/web-ui/uiKit/dialog/core/types';

import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';
import { ExpenseForm } from '@root/presentation/web-ui/modules/expenses/components/expenseForm/expenseForm';
import { useExpenseUpdateMutation } from '@root/presentation/web-ui/modules/expenses/expenses.query';

export function EditExpenseActionSheet({
	expense,
	close,
}: TDialogComponentProps<{ expense: TExpenseDTO }, {}>) {
	let { mutate: updateExpense } = useExpenseUpdateMutation();

	return (
		<ExpenseForm
			onSubmit={(payload) =>
				updateExpense(payload, {
					onSuccess() {
						close({});
					},
				})
			}
			amount={expense.amount}
			currency={expense.currency}
			description={expense.description}
			category={expense.category}
			venue={expense.venue}
			date={expense.date}
		/>
	);
}
