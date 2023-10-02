import { MoneySpentMonthly } from '@modules/expenses/MoneySpentMonthly';
import { useIntl } from '@modules/intl';
import { Card } from '@root/uiKit/card';
import { expenseListMonthlyI18n } from '@screens/expenseListMonthly/expenseListMonthly.i18n';
import { CardContainer } from '@uiKit/cardContainer';
import { Fragment } from 'react';
import styles from './expenseListMonthly.module.css';
import type { TMonth } from '@domain/amount/useCases/types';

const MONTH_LIST: TMonth[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export function ExpenseListMonthlyScreen() {
	let intl = useIntl(expenseListMonthlyI18n);

	return (
		<CardContainer>
			<div className={styles.header}>
				<h1>{intl.translate('title')}</h1>
			</div>

			{MONTH_LIST.map((month) => {
				return (
					<Fragment key={month}>
						<Card>
							<MoneySpentMonthly month={month} />
						</Card>
					</Fragment>
				);
			})}
		</CardContainer>
	);
}
