import { CurrencyConverter } from '@core/infrastructure/currency/currencyConverter/currencyConverter';
import { useExpensesStore } from '@modules/expenses';
import { IntlService } from '@modules/intl';
import { Icon } from '@ui-kit/icon';
import styles from './expense-list.module.css';

export function ExpenseList() {
	let expenseList = useExpensesStore((state) => state.getList());
	let deleteExpense = useExpensesStore((state) => state.deleteExpense);

	let currencyConverter = CurrencyConverter.create();

	return (
		<ul className={styles.list}>
			{expenseList?.map((item) => {
				return (
					<li key={item.id} className={styles.listItem}>
						<div className={styles.info}>
							<span className={styles.expenseInMainCurrency}>
								{IntlService.formatCurrency(
									currencyConverter.convert(
										item.amount,
										item.currency,
										IntlService.currency
									),
									IntlService.currency
								)}
							</span>

							{item.currency && item.currency !== IntlService.currency && (
								<span className={styles.expense}>
									{IntlService.formatCurrency(item.amount, item.currency)}
								</span>
							)}

							{item.comment && (
								<div className={styles.comment}>{item.comment}</div>
							)}

							<em>{IntlService.formatDate(item.dateCreated)}</em>
						</div>

						<div className={styles.buttonGroup}>
							{false && (
								<button type="button" className={styles.actionButton}>
									<Icon name={Icon.IconName.Edit} />
								</button>
							)}

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
