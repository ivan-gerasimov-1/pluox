import { dashboardViewI18n } from '@/web/modules/dashboard/views/dashboard/dashboardView.i18n';
import {
	useExpenseAmountByCategoryQuery,
	useExpenseAmountByDayQuery,
	useExpenseAmountByMonthQuery,
} from '@/web/modules/expenses/expenses.query';
import { useIntl } from '@/web/modules/intl/useIntl/useIntl';
import { EServiceToken } from '@/web/modules/serviceContainer/enums';
import { useService } from '@/web/modules/serviceContainer/useService';
import { useAppConfigBudgetQuery } from '@/web/modules/settings/queries/appConfig';

import { DotSpace } from '@/web/uiKit/dotSpace/dotSpace';
import { Grid, Stack } from '@/web/uiKit/layout/layout';
import { Sheet } from '@/web/uiKit/sheet/sheet';
import { Title } from '@/web/uiKit/title/title';

export function DashboardView() {
	let intlService = useService(EServiceToken.INTL_SERVICE);
	let categoryService = useService(EServiceToken.CATEGORY_SERVICE);

	let intl = useIntl(dashboardViewI18n);

	let monthlyTotal = useExpenseAmountByMonthQuery();
	let dailyTotal = useExpenseAmountByDayQuery();
	let categories = useExpenseAmountByCategoryQuery();

	let budget = useAppConfigBudgetQuery();

	let leftover = budget - monthlyTotal;

	return (
		<Grid className="grow" cols="2" rows="6">
			<Sheet className="col-span-2 row-1" gap="xs" asChild>
				<Stack center>
					<Title className="text-4xl!">
						{intlService.formatCurrency(monthlyTotal, {
							hideDecimal: true,
						})}
					</Title>
				</Stack>
			</Sheet>

			<Sheet className="-rotate-z-2 justify-between" gap="xs" asChild>
				<Stack between>
					<Title>{intl.translate('today')}</Title>

					<div className="font-mono font-semibold text-base tracking-tight self-end">
						{intlService.formatCurrency(dailyTotal, {
							hideDecimal: true,
						})}
					</div>
				</Stack>
			</Sheet>

			<Sheet className="col-2 row-span-2" gap="xs" scrollable asChild>
				<Stack>
					<Title>{intl.translate('categories')}</Title>

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
				</Stack>
			</Sheet>

			<Sheet className="col-1 row-span-2" gap="xs" scrollable disabled asChild>
				<Stack>
					<Title>{intl.translate('venues')}</Title>
				</Stack>
			</Sheet>

			<Sheet gap="xs" asChild>
				<Stack between>
					<Title>{intl.translate('leftover')}</Title>

					<div className="font-mono font-semibold text-base tracking-tight self-end">
						{intlService.formatCurrency(leftover, {
							hideDecimal: true,
						})}
					</div>
				</Stack>
			</Sheet>
		</Grid>
	);
}
