import {
	SwipeableList,
	SwipeableListItem,
	SwipeAction,
	TrailingActions,
	Type,
} from 'react-swipeable-list';

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
import { DotSpace } from '@root/presentation/web-ui/uiKit/dotSpace/dotSpace';
import { EIconName } from '@root/presentation/web-ui/uiKit/icon/icons';
import { IconButton } from '@root/presentation/web-ui/uiKit/iconButton/iconButton';

import 'react-swipeable-list/dist/styles.css';

import { cls } from '@root/presentation/web-ui/utils/classnames';

export type TExpenseListProps = {
	dateFrom?: TISODateString;
	dateTo?: TISODateString;
};

export function ExpenseList(props: TExpenseListProps) {
	let intlService = useService(EServiceToken.INTL_SERVICE);
	let currencyRatesService = useService(EServiceToken.CURRENCY_RATE_SERVICE);
	let categoryService = useService(EServiceToken.CATEGORY_SERVICE);
	let dialog = useDialog();

	let getVenueName = useVenueName();

	let { data: expenseList = [] } = useExpenseListQuery({
		dateFrom: props.dateFrom,
		dateTo: props.dateTo,
	});

	let { mutate: deleteExpense } = useExpenseDeleteMutation();

	return expenseList.map((group) => {
		return (
			<div key={group.date}>
				<div className="text-xs font-semibold">
					{intlService.formatDate(group.date)}
				</div>

				<SwipeableList className="pl-2 font-mono">
					{group.items?.map((item) => {
						return (
							<SwipeableListItem
								key={item.id}
								listType={Type.IOS}
								// className="mt-5 flex items-center justify-between"
								className={cls(
									'gap-4 p-4 mt-3 flex w-full items-center justify-start',
									'rounded-2xl border-neutral-200/50 border',
									'bg-white shadow-(--box-shadow-90)',
									'transition',
									'hover:border-neutral-200 hover:-translate-y-px hover:shadow-(--box-shadow-100)',
									'active:shadow-(--box-shadow-90)',
									'focus-visible:border-neutral-900 focus-visible:outline-none',
								)}
								trailingActions={
									<TrailingActions>
										<SwipeAction
											onClick={() => deleteExpense(item.id)}
											destructive
										>
											<IconButton className="ml-4" iconName={EIconName.Trash} />
										</SwipeAction>
									</TrailingActions>
								}
								fullSwipe
							>
								<CategoryIcon
									onClick={() =>
										dialog.render(EditExpenseActionSheet, {
											expense: item,
										})
									}
								>
									{categoryService.getCategoryIcon(item.category)}
								</CategoryIcon>

								<div className="ml-3 flex grow flex-col">
									<div className="flex items-end justify-start">
										<span className="text-sm grow text-left">
											{intlService.formatCurrency(item.amount, {
												currency: item.currency,
											})}
										</span>

										<DotSpace />

										<span className="text-base font-semibold leading-none">
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
										<div className="mt-2 text-xs text-neutral-600">
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
