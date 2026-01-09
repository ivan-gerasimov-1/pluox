import { dashboardI18n } from '@root/presentation/web-ui/modules/dashboard/screens/dashboard/dashboard.i18n';
import {
	useExpenseAmountByCategoryQuery,
	useExpenseAmountByDayQuery,
	useExpenseAmountByMonthQuery,
} from '@root/presentation/web-ui/modules/expenses/expenses.query';
import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';
import { useAppConfigBudgetQuery } from '@root/presentation/web-ui/modules/settings/queries/appConfig';
import { Card, CardHeader } from '@root/presentation/web-ui/uiKit/card/card';
import { DotSpace } from '@root/presentation/web-ui/uiKit/dotSpace/dotSpace';
import { Grid } from '@root/presentation/web-ui/uiKit/layout/layout';

export function DashboardScreen() {
	let intlService = useService(EServiceToken.INTL_SERVICE);
	let categoryService = useService(EServiceToken.CATEGORY_SERVICE);

	let intl = useIntl(dashboardI18n);

	let monthlyTotal = useExpenseAmountByMonthQuery();
	let dailyTotal = useExpenseAmountByDayQuery();
	let categories = useExpenseAmountByCategoryQuery();

	let budget = useAppConfigBudgetQuery();

	let leftover = budget - monthlyTotal;

	return (
		<Grid className="grow" cols="2" rows="6">
			<Card className="col-span-2 row-1 items-center justify-center">
				<CardHeader className="text-3xl!">
					{intlService.formatCurrency(monthlyTotal, {
						hideDecimal: true,
					})}
				</CardHeader>
			</Card>

			<Card className="-rotate-z-2 justify-between" summary>
				<CardHeader>{intl.translate('today')}</CardHeader>

				<div className="font-mono font-semibold text-base tracking-tight self-end">
					{intlService.formatCurrency(dailyTotal, {
						hideDecimal: true,
					})}
				</div>
			</Card>

			<Card className="col-2 row-span-2 overflow-auto" summary>
				<CardHeader>{intl.translate('categories')}</CardHeader>

				<ul className="gap-3 m-0 p-0 font-semibold flex w-full flex-col">
					{categories.map(({ id, total }) => (
						<li
							key={id}
							className="start-end text-sm tracking-tight flex justify-between leading-none"
						>
							{categoryService.getCategoryIcon(id)}

							<DotSpace />

							{intlService.formatCurrency(total, {
								hideDecimal: true,
							})}
						</li>
					))}
				</ul>
			</Card>

			<Card className="col-1 row-span-2 overflow-auto opacity-75" summary>
				<CardHeader>{intl.translate('venues')}</CardHeader>
			</Card>

			<Card className="justify-between" summary>
				<CardHeader>{intl.translate('leftover')}</CardHeader>

				<div className="font-mono font-semibold text-base tracking-tight self-end">
					{intlService.formatCurrency(leftover, {
						hideDecimal: true,
					})}
				</div>
			</Card>
		</Grid>
	);
}
