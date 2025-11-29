import {
	useExpenseAmountByCategoryQuery,
	useExpenseAmountByDayQuery,
	useExpenseAmountByMonthQuery,
} from '@root/presentation/web-ui/modules/expenses/expenses.query';
import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';
import { useAppConfigBudgetQuery } from '@root/presentation/web-ui/modules/settings/queries/appConfig';
import { Header } from '@root/presentation/web-ui/uiKit/header/header';
import {
	SummaryCard,
	SummaryCardContainer,
} from '@root/presentation/web-ui/uiKit/summaryCard/summaryCard';
import { cls } from '@root/presentation/web-ui/utils/classnames';

export function MainScreen() {
	let intlService = useService(EServiceToken.INTL_SERVICE);
	let categoryService = useService(EServiceToken.CATEGORY_SERVICE);

	let monthlyTotal = useExpenseAmountByMonthQuery();
	let dailyTotal = useExpenseAmountByDayQuery();
	let categories = useExpenseAmountByCategoryQuery();

	let budget = useAppConfigBudgetQuery();

	let leftover = budget - monthlyTotal;

	return (
		<>
			<div className="font-bold text-3xl">
				{intlService.formatCurrency(monthlyTotal, {
					hideDecimal: true,
				})}
			</div>

			<SummaryCardContainer>
				<SummaryCard className="-rotate-z-2">
					<div>Сегодня</div>

					<div className="font-mono font-semibold text-base self-end">
						{intlService.formatCurrency(dailyTotal, {
							hideDecimal: true,
						})}
					</div>
				</SummaryCard>

				<SummaryCard>
					<div>Остаток</div>

					<div className="font-mono font-semibold text-base self-end">
						{intlService.formatCurrency(leftover, {
							hideDecimal: true,
						})}
					</div>
				</SummaryCard>

				<SummaryCard className="col-2 row-span-full overflow-auto">
					<div>Категории</div>

					<ul className="gap-3 p-0 font-semibold flex w-full flex-col">
						{categories.map(({ id, total }) => (
							<li key={id} className="start-end flex justify-between">
								<span className="leading-none">
									{categoryService.getCategoryIcon(id)}
								</span>

								<span
									className={cls(
										'h-4 mx-1 w-full',
										'bg-size-[0.5rem_1.25rem]',
										'bg-radial-[circle,var(--color-neutral-400)_1px,transparent_0]',
									)}
								></span>

								<span className="leading-none">
									{intlService.formatCurrency(total, {
										hideDecimal: true,
									})}
								</span>
							</li>
						))}
					</ul>
				</SummaryCard>
			</SummaryCardContainer>
		</>
	);
}

export function MainScreenHeader() {
	let temporal = useService(EServiceToken.TEMPORAL);

	let today = temporal.format({
		format: 'MMMM, YYYY',
	});

	return <Header title={today} />;
}
