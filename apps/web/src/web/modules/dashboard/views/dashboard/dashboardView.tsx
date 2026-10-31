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

import { DotSpace } from '@kit/dotSpace/dotSpace';
import { Grid, Stack } from '@kit/layout/layout';
import { Sheet } from '@kit/sheet/sheet';
import { Title } from '@kit/title/title';

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
			<Sheet
				className="col-span-2 row-1 bg-linear-to-br from-violet-600 to-indigo-700 text-white"
				gap="xs"
				asChild
			>
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

					<div className="self-end font-mono text-base font-semibold tracking-tight">
						{intlService.formatCurrency(dailyTotal, {
							hideDecimal: true,
						})}
					</div>
				</Stack>
			</Sheet>

			<Sheet className="col-2 row-span-2" gap="xs" scrollable asChild>
				<Stack>
					<Title>{intl.translate('categories')}</Title>

					<ul className="m-0 flex w-full flex-col gap-3 p-0 font-semibold">
						{categories.map(({ id, total }) => (
							<li
								key={id}
								className="start-end flex justify-between text-sm leading-none tracking-tight"
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

					<div className="self-end font-mono text-base font-semibold tracking-tight">
						{intlService.formatCurrency(leftover, {
							hideDecimal: true,
						})}
					</div>
				</Stack>
			</Sheet>
		</Grid>
	);
}
