import { dashboardI18n } from '@/presentation/web-ui/modules/dashboard/screens/dashboard/dashboard.i18n';
import {
	useExpenseAmountByCategoryQuery,
	useExpenseAmountByDayQuery,
	useExpenseAmountByMonthQuery,
} from '@/presentation/web-ui/modules/expenses/expenses.query';
import { useIntl } from '@/presentation/web-ui/modules/intl/useIntl/useIntl';
import { EServiceToken } from '@/presentation/web-ui/modules/serviceContainer/enums';
import { useService } from '@/presentation/web-ui/modules/serviceContainer/useService';
import { useAppConfigBudgetQuery } from '@/presentation/web-ui/modules/settings/queries/appConfig';
import { Card, CardHeader } from '@/presentation/web-ui/uiKit/card/card';
import { DotSpace } from '@/presentation/web-ui/uiKit/dotSpace/dotSpace';
import { Grid, Stack } from '@/presentation/web-ui/uiKit/layout/layout';

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
			<Card className="col-span-2 row-1" summary asChild>
				<Stack className="items-center justify-center" row>
					<CardHeader className="text-4xl!">
						{intlService.formatCurrency(monthlyTotal, {
							hideDecimal: true,
						})}
					</CardHeader>
				</Stack>
			</Card>

			<Card className="-rotate-z-2 justify-between" summary asChild>
				<Stack>
					<CardHeader>{intl.translate('today')}</CardHeader>

					<div className="font-mono font-semibold text-base tracking-tight self-end">
						{intlService.formatCurrency(dailyTotal, {
							hideDecimal: true,
						})}
					</div>
				</Stack>
			</Card>

			<Card className="col-2 row-span-2 overflow-auto" summary asChild>
				<Stack>
					<CardHeader>{intl.translate('categories')}</CardHeader>

					<ul className="gap-2 m-0 p-0 font-semibold flex w-full flex-col">
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
				</Stack>
			</Card>

			<Card
				className="col-1 row-span-2 overflow-auto opacity-50"
				summary
				asChild
			>
				<Stack>
					<CardHeader>{intl.translate('venues')}</CardHeader>
				</Stack>
			</Card>

			<Card className="justify-between" summary asChild>
				<Stack>
					<CardHeader>{intl.translate('leftover')}</CardHeader>

					<div className="font-mono font-semibold text-base tracking-tight self-end">
						{intlService.formatCurrency(leftover, {
							hideDecimal: true,
						})}
					</div>
				</Stack>
			</Card>
		</Grid>
	);
}
