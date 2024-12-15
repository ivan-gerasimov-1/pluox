import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { Id, TISODateString } from '@domain/types';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';
import { Icon } from '@root/presentation/web-ui/uiKit/icon/icon';
import {
	SwipeAction,
	SwipeableList,
	SwipeableListItem,
	TrailingActions,
	Type,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { CategoryIcon } from '@root/presentation/web-ui/uiKit/categoryIcon/categoryIcon';
import {
	deleteOne,
	getList,
	QUERY_EXPENSES_LIST,
	QUERY_EXPENSES_MONTHLY_AMOUNT,
	QUERY_EXPENSES_TOTAL_AMOUNT,
} from '@root/presentation/web-ui/modules/expenses/expenses.query';
import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';

import styles from './expenseList.module.css';

export type TExpenseListProps = {
	dateFrom?: TISODateString;
	dateTo?: TISODateString;
};

export function ExpenseList(props: TExpenseListProps) {
	let intlService = useService(EServiceToken.INTL_SERVICE);
	let currencyConverter = useService(EServiceToken.CURRENCY_CONVERTER);
	let expenseService = useService(EServiceToken.EXPENSE_SERVICE);
	let queryClient = useQueryClient();

	let { data: expenseGroups = [] } = useQuery({
		queryKey: [QUERY_EXPENSES_LIST, props.dateFrom, props.dateTo],
		queryFn: ({ queryKey }) => {
			let [, dateFrom, dateTo] = queryKey as [string, string, string];

			let expenseList = getList({
				dateFrom,
				dateTo,
			});
			let expenseGroups = expenseService.groupExpenseByDate(expenseList);

			return expenseGroups;
		},
		refetchOnMount: false,
	});

	let deleteExpense = useMutation({
		mutationFn: async (id: Id) => {
			deleteOne(id);
		},
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: [QUERY_EXPENSES_TOTAL_AMOUNT],
					/**
					 * @description
					 * For now we could use this approach, alternative is to
					 * refetch a query onMount if it is invalidated
					 * @example
					 *   refetchOnMount({ state }) {
					 *     return state.isInvalidated;
					 *   }
					 */
					refetchType: 'all',
				}),
				queryClient.invalidateQueries({
					queryKey: [QUERY_EXPENSES_MONTHLY_AMOUNT],
					refetchType: 'all',
				}),
				queryClient.invalidateQueries({
					queryKey: [QUERY_EXPENSES_LIST],
					refetchType: 'all',
				}),
			]);
		},
	});

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
												deleteExpense.mutate(item.id);
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
									<CategoryIcon categoryId={item.category} />
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
							</SwipeableListItem>
						);
					})}
				</SwipeableList>
			</div>
		);
	});
}
