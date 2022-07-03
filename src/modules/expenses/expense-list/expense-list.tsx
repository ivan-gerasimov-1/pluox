import { CurrencyConverter } from '@domain/currency/currency-converter/CurrencyConverter';
import { ECurrency } from '@domain/expense/types';
import { useExpensesStore } from '@modules/expenses';
import { IntlService } from '@modules/intl';
import { Icon } from '@ui-kit/icon';
import styles from './expense-list.module.css';

let currencyConverter = CurrencyConverter.create();

export function ExpenseList() {
	let expenseList = useExpensesStore((state) => state.getList());
	let deleteExpense = useExpensesStore((state) => state.deleteExpense);

	return (
		<ul className={styles.list}>
			{expenseList?.map((item) => {
				return (
					<li key={item.id} className={styles.listItem}>
						<div className={styles.info}>
							<span className={styles.expenseInMainCurrency}>
								{IntlService.formatCurrency(
									currencyConverter.convertToRub(
										item.amount,
										item.currency || ECurrency.RUB
									),
									ECurrency.RUB
								)}
							</span>

							{item.currency && item.currency !== ECurrency.RUB && (
								<span className={styles.expense}>
									{IntlService.formatCurrency(item.amount, item.currency)}
								</span>
							)}

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
