import { EAppPath } from '@root/presentation/web-ui/appPath';

import type { TMonth } from '@domain/amount/useCases/types';

import { dateFn } from '@modules/date/date';

import { MoneySpentMonth } from '@root/presentation/web-ui/modules/expenses/MoneySpentMonth/MoneySpentMonth';
import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import { expenseListMonthlyI18n } from '@root/presentation/web-ui/screens/expenseListMonthly/expenseListMonthly.i18n';
import { Card } from '@root/presentation/web-ui/uiKit/card/card';
import { CardContainer } from '@root/presentation/web-ui/uiKit/cardContainer/cardContainer';
import { Header } from '@root/presentation/web-ui/uiKit/header/header';
import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';
import { AppLink } from '@root/presentation/web-ui/uiKit/appLink/appLink';

const MONTH_LIST: TMonth[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export function ExpenseListMonthlyScreen() {
	let intl = useIntl(expenseListMonthlyI18n);

	return (
		<Screen>
			<Header title={intl.translate('title')} />

			<CardContainer>
				{MONTH_LIST.map((month) => {
					let dateFrom = dateFn({
						month,
					})
						.startOf('month')
						.toISOString();
					let dateTo = dateFn({
						month,
					})
						.endOf('month')
						.toISOString();

					return (
						<AppLink
							key={month}
							to={`${EAppPath.EXPENSES}?dateFrom=${dateFrom}&dateTo=${dateTo}`}
						>
							<Card key={month} touchable>
								<MoneySpentMonth month={month} />
							</Card>
						</AppLink>
					);
				})}
			</CardContainer>
		</Screen>
	);
}
