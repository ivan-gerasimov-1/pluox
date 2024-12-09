import { EAppPath } from '@root/presentation/web-ui/appPath';

import { useService } from '@root/modules/serviceContainer/react/useService';
import { EServiceToken } from '@root/modules/serviceContainer/types';

import { MoneySpentMonth } from '@root/presentation/web-ui/modules/expenses/MoneySpentMonth/MoneySpentMonth';
import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import { expenseListMonthlyI18n } from '@root/presentation/web-ui/screens/expenseListMonthly/expenseListMonthly.i18n';
import { Card } from '@root/presentation/web-ui/uiKit/card/card';
import { CardContainer } from '@root/presentation/web-ui/uiKit/cardContainer/cardContainer';
import { Header } from '@root/presentation/web-ui/uiKit/header/header';
import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';
import { AppLink } from '@root/presentation/web-ui/uiKit/appLink/appLink';

export function ExpenseListMonthlyScreen() {
	let intl = useIntl(expenseListMonthlyI18n);
	let temporal = useService(EServiceToken.TEMPORAL);

	return (
		<Screen>
			<Header title={intl.translate('title')} />

			<CardContainer>
				{temporal.getMonthList().map((month) => {
					let dateFrom = temporal.getStartOfMonth(month);
					let dateTo = temporal.getEndOfMonth(month);

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
