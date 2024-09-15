import { type Id } from '@domain/types';
import { ExpenseForm } from '@modules/expenses/expenseView/expenseForm';
import { useExpensesStore } from '@modules/expenses/expenses.store';

type TEditExpenseProps = {
	id: Id;
};

export function EditExpense(props: TEditExpenseProps) {
	let expense = useExpensesStore((state) => state.getOne(props.id));
	let editExpense = useExpensesStore((state) => state.editExpense);

	return (
		<ExpenseForm
			onSubmit={editExpense}
			amount={expense.amount}
			currency={expense.currency}
			comment={expense.comment}
			category={expense.category}
			date={expense.date}
		/>
	);
}
