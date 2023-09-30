import { CurrencyConverter } from '@core/infrastructure/currency/currencyConverter/currencyConverter';
import { IntlService } from '@core/infrastructure/intl/intlService/IntlService';
import type { Id, TISODateString } from '@domain/types';
import { useExpensesStore } from '@modules/expenses';
import { groupExpenseListByDay } from '@modules/expenses/expenseList/helpers';
import { Icon } from '@root/uiKit/icon';
import styles from './expenseList.module.css';
import {
	SwipeAction,
	SwipeableList,
	SwipeableListItem,
	TrailingActions,
	Type,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { getCategoryIcon } from '@domain/categories/getCategoryIcon';

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

	return expenseGroups.map((group) => {
		let expenseList = group.items;

		return (
			<div key={group.date}>
				<div className={styles.date}>{intlService.formatDate(group.date)}</div>

				<SwipeableList className={styles.list}>
					{expenseList?.map((item) => {
						return (
							<SwipeableListItem
								key={item.id}
								maxSwipe={1}
								listType={Type.IOS}
								className={styles.listItem}
								trailingActions={
									<TrailingActions>
										<SwipeAction
											Tag="div"
											onClick={() => {
												deleteExpense(item.id);
											}}
											destructive
										>
											<button type="button" className={styles.actionButton}>
												<Icon name={Icon.IconName.Trash} />
											</button>
										</SwipeAction>
									</TrailingActions>
								}
								fullSwipe
							>
								<div className={styles.iconContainer}>
									<div className={styles.icon}>
										{getCategoryIcon(item.category)}
									</div>
								</div>

								<div className={styles.info}>
									<div className={styles.amount}>
										<span className={styles.expense}>
											{intlService.formatCurrency(item.amount, item.currency)}
										</span>

										<span className={styles.dotFilledSpace} />

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
									</div>

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
								</div>
							</SwipeableListItem>
						);
					})}
				</SwipeableList>
			</div>
		);
	});
}
