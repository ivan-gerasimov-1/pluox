import { useExpensesStore } from '@modules/expenses';
import { IntlService } from '@modules/intl';
import styles from './expense-list.module.css';

export function ExpenseList() {
	let expenseList = useExpensesStore((state) => state.getList());
	let deleteExpense = useExpensesStore((state) => state.deleteExpense);

	return (
		<ul className={styles.list}>
			{expenseList?.map((item) => {
				return (
					<li key={item.id} className={styles.listItem}>
						<strong>{IntlService.formatCurrency(item.amount)}</strong>

						<span>{IntlService.formatDate(item.dateCreated)}</span>

						<button
							type="button"
							className={styles.deleteButton}
							onClick={() => deleteExpense(item.id)}
						>
							X
						</button>
					</li>
				);
			})}
		</ul>
	);
}
