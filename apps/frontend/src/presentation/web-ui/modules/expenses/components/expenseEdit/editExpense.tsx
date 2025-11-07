import type { TExpenseDTO } from '@root/core/modules/expense/application/dto/expenseDTO';
import { ExpenseForm } from '@root/presentation/web-ui/modules/expenses/components/expenseForm/expenseForm';
import { useExpenseUpdateMutation } from '@root/presentation/web-ui/modules/expenses/expenses.query';

export function ExpenseEdit({ expense }: { expense: TExpenseDTO }) {
	let { mutate: updateExpense } = useExpenseUpdateMutation();

	return (
		<ExpenseForm
			onSubmit={updateExpense}
			amount={expense.amount}
			currency={expense.currency}
			description={expense.description}
			category={expense.category}
			venue={expense.venue}
			date={expense.date}
		/>
	);
}
