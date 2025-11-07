import {
	SwipeAction,
	SwipeableList,
	SwipeableListItem,
	TrailingActions,
	Type,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import type { TISODateString } from '@root/core/domain/temporal/types';
import { EditExpenseActionSheet } from '@root/presentation/web-ui/modules/expenses/components/expenseEdit/editExpenseActionSheet';
import {
	useExpenseDeleteMutation,
	useExpenseListQuery,
} from '@root/presentation/web-ui/modules/expenses/expenses.query';
import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';
import { useVenueName } from '@root/presentation/web-ui/modules/venues/hooks/useVenueName';
import { CategoryIcon } from '@root/presentation/web-ui/uiKit/categoryIcon/categoryIcon';
import { useDialog } from '@root/presentation/web-ui/uiKit/dialog/react/dialog/useDialog';
import { Icon } from '@root/presentation/web-ui/uiKit/icon/icon';
import { EIconName } from '@root/presentation/web-ui/uiKit/icon/icons';

import styles from './expenseList.module.css';

export type TExpenseListProps = {
	dateFrom?: TISODateString;
	dateTo?: TISODateString;
};

export function ExpenseList(props: TExpenseListProps) {
	let intlService = useService(EServiceToken.INTL_SERVICE);
	let currencyRatesService = useService(EServiceToken.CURRENCY_RATE_SERVICE);
	let dialog = useDialog();

	let getVenueName = useVenueName();

	let { data: expenseList } = useExpenseListQuery({
		dateFrom: props.dateFrom,
		dateTo: props.dateTo,
	});

	let { mutate: deleteExpense } = useExpenseDeleteMutation();

	return expenseList.map((group) => {
		return (
			<div key={group.date} className={styles.groupContainer}>
				<div className={styles.date}>{intlService.formatDate(group.date)}</div>

				<SwipeableList className={styles.list}>
					{group.items?.map((item) => {
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
												<Icon name={EIconName.Trash} />
											</button>
										</SwipeAction>
									</TrailingActions>
								}
								fullSwipe
							>
								<CategoryIcon
									categoryId={item.category}
									onClick={() => {
										dialog.render(EditExpenseActionSheet, {
											expense: item,
										});
									}}
								/>

								<div className={styles.info}>
									<div className={styles.amount}>
										<span className={styles.expense}>
											{intlService.formatCurrency(item.amount, {
												currency: item.currency,
											})}
										</span>

										<span className={styles.dotFilledSpace} />

										<span className={styles.expenseInMainCurrency}>
											{intlService.formatCurrency(
												currencyRatesService.convert(
													item.amount,
													item.currency,
													intlService.currency,
												),
											)}
										</span>
									</div>

									{(item.description || item.venue) && (
										<div className={styles.description}>
											{item.venue && <span>⚲ {getVenueName(item.venue)}</span>}
											{item.venue && item.description && <span> | </span>}
											{item.description}
										</div>
									)}
								</div>
							</SwipeableListItem>
						);
					})}
				</SwipeableList>
			</div>
		);
	});
}
