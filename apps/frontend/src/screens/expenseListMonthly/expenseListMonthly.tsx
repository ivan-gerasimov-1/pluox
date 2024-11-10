import { EAppPath } from '@root/appPath';

import type { TMonth } from '@domain/amount/useCases/types';

import { MoneySpentMonth } from '@modules/expenses/MoneySpentMonth';
import { useIntl } from '@modules/intl/useIntl';
import { dateFn } from '@modules/date/date';

import { expenseListMonthlyI18n } from '@screens/expenseListMonthly/expenseListMonthly.i18n';

import { Card } from '@uiKit/card/card';
import { CardContainer } from '@uiKit/cardContainer';
import { Header } from '@uiKit/header/header';
import { Screen } from '@uiKit/screen/screen';
import { AppLink } from '@uiKit/appLink/appLink';

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
