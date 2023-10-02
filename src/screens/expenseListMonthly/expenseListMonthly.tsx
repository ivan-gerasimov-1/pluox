import { MoneySpentMonthly } from '@modules/expenses/MoneySpentMonthly';
import { useIntl } from '@modules/intl';
import { Card } from '@root/uiKit/card';
import { expenseListMonthlyI18n } from '@screens/expenseListMonthly/expenseListMonthly.i18n';
import { useMonths } from '@screens/expenseListMonthly/hooks/useMonths';
import { CardContainer } from '@uiKit/cardContainer';
import { Fragment } from 'react';
import styles from './expenseListMonthly.module.css';

export function ExpenseListMonthlyScreen() {
	let intl = useIntl(expenseListMonthlyI18n);
	let months = useMonths();

	return (
		<CardContainer>
			<div className={styles.header}>
				<h1>{intl.translate('title')}</h1>
			</div>

			<br />

			{months.map((month) => {
				return (
					<Fragment key={month}>
						<Card>
							<MoneySpentMonthly currentDate={month} />
						</Card>

						<br />
					</Fragment>
				);
			})}
		</CardContainer>
	);
}
