import { useExpensesStore } from '@modules/expenses';
import { IntlService } from '@modules/intl';
import { Icon } from '@ui-kit/icon';
import styles from './expense-list.module.css';

export function ExpenseList() {
	let expenseList = useExpensesStore((state) => state.getList());
	let deleteExpense = useExpensesStore((state) => state.deleteExpense);

	return (
		<ul className={styles.list}>
			{expenseList?.map((item) => {
				return (
					<li key={item.id} className={styles.listItem}>
						<div className={styles.info}>
							<strong>
								{IntlService.formatCurrency(item.amount, item.currency)}
							</strong>

							<em>{IntlService.formatDate(item.dateCreated)}</em>
						</div>

						<div className={styles.buttonGroup}>
							<button type="button" className={styles.actionButton}>
								<Icon name={Icon.IconName.Edit} />
							</button>

							<button
								type="button"
								className={styles.actionButton}
								onClick={() => deleteExpense(item.id)}
							>
								<Icon name={Icon.IconName.Trash} />
							</button>
						</div>
					</li>
				);
			})}
		</ul>
	);
}
