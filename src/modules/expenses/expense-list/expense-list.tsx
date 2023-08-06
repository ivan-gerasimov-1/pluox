import { CurrencyConverter } from '@core/infrastructure/currency/currencyConverter/currencyConverter';
import { useExpensesStore } from '@modules/expenses';
import { IntlService } from '@core/infrastructure/intl/IntlService';
import { Icon } from '@ui-kit/icon';
import styles from './expense-list.module.css';

export function ExpenseList() {
	let intlService = IntlService.getInstance();
	let currencyConverter = CurrencyConverter.getInstance();

	let expenseList = useExpensesStore((state) => state.getList());
	let deleteExpense = useExpensesStore((state) => state.deleteExpense);

	return (
		<ul className={styles.list}>
			{expenseList?.map((item) => {
				return (
					<li key={item.id} className={styles.listItem}>
						<div className={styles.info}>
							<span className={styles.expenseInMainCurrency}>
								{intlService.formatCurrency(
									currencyConverter.convert(
										item.amount,
										item.currency,
										intlService.currency
									),
									intlService.currency
								)}
							</span>

							{item.currency && item.currency !== intlService.currency && (
								<span className={styles.expense}>
									{intlService.formatCurrency(item.amount, item.currency)}
								</span>
							)}

							{item.comment && (
								<div className={styles.comment}>{item.comment}</div>
							)}

							<em>{intlService.formatDate(item.dateCreated)}</em>
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
