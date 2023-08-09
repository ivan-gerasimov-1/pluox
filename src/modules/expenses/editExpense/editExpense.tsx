import { type Id } from '@domain/types';
import { useExpensesStore } from '@modules/expenses';

type TEditExpense = {
	itemId: Id;
};

export function EditExpense(props: TEditExpense) {
	let expense = useExpensesStore((state) => state.getOne(props.itemId));

	return (
		<div>
			<div>Amount: {expense.amount}</div>
			<div>Currency: {expense.currency}</div>
			<div>Comment: {expense.comment}</div>
		</div>
	);
}
