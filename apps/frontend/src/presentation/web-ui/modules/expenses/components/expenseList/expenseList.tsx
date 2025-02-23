import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from '@tanstack/react-query';
import {
	SwipeAction,
	SwipeableList,
	SwipeableListItem,
	TrailingActions,
	Type,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import type { Id } from '@domain/types';
import type { TISODateString } from '@root/core/domain/temporal/types';
import {
	EXPENSES_QUERY_LIST,
	EXPENSES_QUERY_MONTHLY_AMOUNT,
	EXPENSES_QUERY_TOTAL_AMOUNT,
	deleteOne,
	getList,
} from '@root/presentation/web-ui/modules/expenses/expenses.query';
import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';
import { CategoryIcon } from '@root/presentation/web-ui/uiKit/categoryIcon/categoryIcon';
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
	let expenseService = useService(EServiceToken.EXPENSE_SERVICE);
	let vanueQueryService = useService(EServiceToken.VENUE_QUERY_SERVICE);
	let queryClient = useQueryClient();

	/**
	 * @todo
	 * 1. Experimental usage of useSuspenseQuery
	 */
	let expenseListQuery = useSuspenseQuery({
		queryKey: [EXPENSES_QUERY_LIST, props.dateFrom, props.dateTo],
		queryFn: ({ queryKey }) => {
			let [, dateFrom, dateTo] = queryKey;

			let expenseList = getList({
				dateFrom,
				dateTo,
			}).map((expense) => {
				if (expense.venue) {
					let venue = vanueQueryService.getById(expense.venue);

					expense.venue = venue?.name ?? null;
				}

				return expense;
			});

			return expenseService.groupExpenseByDate(expenseList);
		},
		// placeholderData: [],
		refetchOnMount: false,
	});

	let deleteExpense = useMutation({
		mutationFn: async (id: Id) => {
			deleteOne(id);
		},
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: [EXPENSES_QUERY_TOTAL_AMOUNT],
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
					queryKey: [EXPENSES_QUERY_MONTHLY_AMOUNT],
					refetchType: 'all',
				}),
				queryClient.invalidateQueries({
					queryKey: [EXPENSES_QUERY_LIST],
					refetchType: 'all',
				}),
			]);
		},
	});

	return expenseListQuery.data.map((group) => {
		let expenseList = group.items;

		return (
			<div key={group.date} className={styles.groupContainer}>
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
												<Icon name={EIconName.Trash} />
											</button>
										</SwipeAction>
									</TrailingActions>
								}
								fullSwipe
							>
								<CategoryIcon categoryId={item.category} />

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
											{item.venue && <span>⚲ {item.venue}</span>}
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
