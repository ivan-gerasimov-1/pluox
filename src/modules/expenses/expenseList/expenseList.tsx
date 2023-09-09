import { CurrencyConverter } from '@core/infrastructure/currency/currencyConverter/currencyConverter';
import { IntlService } from '@core/infrastructure/intl/intlService/IntlService';
import type { Id, TISODateString } from '@domain/types';
import { useExpensesStore } from '@modules/expenses';
import { groupExpenseListByDay } from '@modules/expenses/expenseList/helpers';
import { Icon } from '@root/uiKit/icon';
import styles from './expenseList.module.css';

export type TExpenseListProps = {
	dateFrom?: TISODateString;
	dateTo?: TISODateString;

	onEdit?(itemId: Id): void;
};

export function ExpenseList(props: TExpenseListProps) {
	let intlService = IntlService.getInstance();
	let currencyConverter = CurrencyConverter.getInstance();

	let expenseList = useExpensesStore((state) =>
		state.getList({
			dateFrom: props.dateFrom,
			dateTo: props.dateTo,
		}),
	);
	let deleteExpense = useExpensesStore((state) => state.deleteExpense);

	let expenseGroups = groupExpenseListByDay(expenseList);

	return (
		<>
			{Object.values(expenseGroups).map((group) => {
				let expenseList = group.items;

				return (
					<div key={group.date}>
						<div className={styles.date}>
							{intlService.formatDate(group.date)}
						</div>

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
														intlService.currency,
													),
													intlService.currency,
												)}
											</span>

											{item.currency &&
												item.currency !== intlService.currency && (
													<span className={styles.expense}>
														{intlService.formatCurrency(
															item.amount,
															item.currency,
														)}
													</span>
												)}

											{item.comment && (
												<div className={styles.comment}>{item.comment}</div>
											)}
										</div>

										<div className={styles.buttonGroup}>
											{/* <button
												type="button"
												className={styles.actionButton}
												onClick={() => {
													if (!props.onEdit) {
														return;
													}

													props.onEdit(item.id);
												}}
											>
												<Icon name={Icon.IconName.Edit} />
											</button> */}

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
					</div>
				);
			})}
		</>
	);
}
