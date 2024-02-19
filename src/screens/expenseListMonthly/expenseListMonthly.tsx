import { Fragment } from 'react';

import type { TMonth } from '@domain/amount/useCases/types';

import { MoneySpentMonth } from '@modules/expenses/MoneySpentMonth';
import { useIntl } from '@modules/intl';

import { expenseListMonthlyI18n } from '@screens/expenseListMonthly/expenseListMonthly.i18n';

import { Card } from '@uiKit/card/card';
import { CardContainer } from '@uiKit/cardContainer';
import { Header } from '@uiKit/header/header';

const MONTH_LIST: TMonth[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export function ExpenseListMonthlyScreen() {
	let intl = useIntl(expenseListMonthlyI18n);

	return (
		<CardContainer>
			<Header title={intl.translate('title')} />

			{MONTH_LIST.map((month) => {
				return (
					<Fragment key={month}>
						<Card>
							<MoneySpentMonth month={month} />
						</Card>
					</Fragment>
				);
			})}
		</CardContainer>
	);
}
