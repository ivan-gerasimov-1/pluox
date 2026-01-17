import {
	SwipeableList,
	SwipeableListItem,
	SwipeAction,
	TrailingActions,
	Type,
} from 'react-swipeable-list';

import type { TISODateString } from '@/core/domain/temporal/types';

import { EditExpenseActionSheet } from '@/presentation/web-ui/modules/expenses/components/expenseEdit/editExpenseActionSheet';
import {
	useExpenseDeleteMutation,
	useExpenseListQuery,
} from '@/presentation/web-ui/modules/expenses/expenses.query';
import { EServiceToken } from '@/presentation/web-ui/modules/serviceContainer/enums';
import { useService } from '@/presentation/web-ui/modules/serviceContainer/useService';
import { useVenueName } from '@/presentation/web-ui/modules/venues/hooks/useVenueName';
import { useDialog } from '@/presentation/web-ui/uiKit/dialog/react/dialog/useDialog';
import { DotSpace } from '@/presentation/web-ui/uiKit/dotSpace/dotSpace';
import { EIconName } from '@/presentation/web-ui/uiKit/icon/icons';
import { IconButton } from '@/presentation/web-ui/uiKit/iconButton/iconButton';
import { ListIcon } from '@/presentation/web-ui/uiKit/list/list';

import 'react-swipeable-list/dist/styles.css';

import { cn } from '@/presentation/web-ui/utils/classnames';

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
					{group.items?.map((item) => {
						return (
							<SwipeableListItem
								key={item.id}
								listType={Type.IOS}
								className={cn(
									'px-3 py-4 mt-3',
									'rounded-2xl border-neutral-200/50 border',
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
										<span className="text-sm grow text-left leading-none">
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
