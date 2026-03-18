import {
	SwipeableList,
	SwipeableListItem,
	SwipeAction,
	TrailingActions,
	Type,
} from 'react-swipeable-list';

import type { TISODateString } from '@core/domain/temporal/types';

import { EditExpenseActionSheet } from '@/web/modules/expenses/components/expenseEditActionSheet/expenseEditActionSheet';
import {
	useExpenseDeleteMutation,
	useExpenseListQuery,
} from '@/web/modules/expenses/expenses.query';
import { EServiceToken } from '@/web/modules/serviceContainer/enums';
import { useService } from '@/web/modules/serviceContainer/useService';
import { useVenueName } from '@/web/modules/venues/hooks/useVenueName';

import { useDialog } from '@kit/dialog/react/dialog/useDialog';
import { DotSpace } from '@kit/dotSpace/dotSpace';
import { EIconName } from '@kit/icon/icons';
import { IconButton } from '@kit/iconButton/iconButton';
import { ListIcon } from '@kit/list/list';

import 'react-swipeable-list/dist/styles.css';

import { cn } from '@/web/utils/classnames';

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

				<SwipeableList className="font-mono">
					{group.items.map((item) => {
						return (
							<SwipeableListItem
								key={item.id}
								listType={Type.IOS}
								className={cn(
									'mt-3 px-3 py-4',
									'rounded-2xl border border-gray-200/50',
									'bg-white',
								)}
								trailingActions={
									<TrailingActions>
										<SwipeAction
											onClick={() => deleteExpense(item.id)}
											destructive
										>
											<IconButton className="mx-4" iconName={EIconName.Trash} />
										</SwipeAction>
									</TrailingActions>
								}
								fullSwipe
							>
								<ListIcon
									onClick={() =>
										dialog.render(EditExpenseActionSheet, {
											expense: item,
										})
									}
								>
									{categoryService.getCategoryIcon(item.category)}
								</ListIcon>

								<div className="ml-3 flex grow flex-col">
									<div className="flex items-end justify-start">
										<span className="grow text-left text-sm leading-none">
											{intlService.formatCurrency(item.amount, {
												currency: item.currency,
											})}
										</span>

										<DotSpace />

										<span className="text-base leading-none font-semibold">
											{intlService.formatCurrency(
												currencyRatesService.convert(
													item.amount,
													item.currency,
													intlService.currency,
												),
											)}
										</span>
									</div>

									{
										// oxlint-disable typescript/strict-boolean-expressions
										(item.description ?? item.venue) && (
											<div className="mt-2 text-xs text-gray-600">
												{/* oxlint-disable typescript/strict-boolean-expressions */}
												{item.venue && (
													<span>⚲ {getVenueName(item.venue)}</span>
												)}
												{/* oxlint-disable typescript/strict-boolean-expressions */}
												{item.venue && item.description && <span> | </span>}
												{item.description}
											</div>
										)
									}
								</div>
							</SwipeableListItem>
						);
					})}
				</SwipeableList>
			</div>
		);
	});
}
