import type { TExpenseDTO } from '@/core/modules/expense/application/dto/expenseDTO';
import { ExpenseForm } from '@/presentation/web-ui/modules/expenses/components/expenseForm/expenseForm';
import { createDateViewValue } from '@/presentation/web-ui/modules/expenses/components/expenseNew/helpers/createDateViewValue';
import { useExpenseUpdateMutation } from '@/presentation/web-ui/modules/expenses/expenses.query';
import type { TDialogComponentProps } from '@/presentation/web-ui/uiKit/dialog/core/types';

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
