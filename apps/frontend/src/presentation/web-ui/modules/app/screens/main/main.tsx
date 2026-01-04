import { mainI18n } from '@root/presentation/web-ui/modules/app/screens/main/main.i18n';
import {
	useExpenseAmountByCategoryQuery,
	useExpenseAmountByDayQuery,
	useExpenseAmountByMonthQuery,
} from '@root/presentation/web-ui/modules/expenses/expenses.query';
import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';
import { useAppConfigBudgetQuery } from '@root/presentation/web-ui/modules/settings/queries/appConfig';
import { SummaryCard } from '@root/presentation/web-ui/uiKit/card/summaryCard';
import { DotSpace } from '@root/presentation/web-ui/uiKit/dotSpace/dotSpace';
import { Grid } from '@root/presentation/web-ui/uiKit/grid/grid';
import { Header } from '@root/presentation/web-ui/uiKit/header/header';

export function MainScreen() {
	let intlService = useService(EServiceToken.INTL_SERVICE);
	let categoryService = useService(EServiceToken.CATEGORY_SERVICE);

	let intl = useIntl(mainI18n);

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

			<Grid>
				<SummaryCard className="min-h-36 -rotate-z-2">
					<div>{intl.translate('today')}</div>

					<div className="font-mono font-semibold text-base self-end">
						{intlService.formatCurrency(dailyTotal, {
							hideDecimal: true,
						})}
					</div>
				</SummaryCard>

				<SummaryCard className="min-h-36">
					<div>{intl.translate('leftover')}</div>

					<div className="font-mono font-semibold text-base self-end">
						{intlService.formatCurrency(leftover, {
							hideDecimal: true,
						})}
					</div>
				</SummaryCard>

				<SummaryCard className="col-2 row-span-full overflow-auto">
					<div>{intl.translate('categories')}</div>

					<ul className="gap-3 p-0 font-semibold flex w-full flex-col">
						{categories.map(({ id, total }) => (
							<li key={id} className="start-end flex justify-between">
								<span className="leading-none">
									{categoryService.getCategoryIcon(id)}
								</span>

								<DotSpace />

								<span className="leading-none">
									{intlService.formatCurrency(total, {
										hideDecimal: true,
									})}
								</span>
							</li>
						))}
					</ul>
				</SummaryCard>
			</Grid>
		</>
	);
}

export function MainScreenHeader() {
	let temporal = useService(EServiceToken.TEMPORAL);

	let today = temporal.format({
		format: 'MMMM, YYYY',
	});

	return <Header title={{ 'en-US': today, 'ru-RU': today }} />;
}
