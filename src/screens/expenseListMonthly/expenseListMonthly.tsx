import { useIntl } from '@modules/intl';
import { expenseListMonthlyI18n } from '@screens/expenseListMonthly/expenseListMonthly.i18n';
import styles from './expenseListMonthly.module.css';
import { MoneySpentCurrentMonth } from '@modules/expenses/money-spent-current-month';
import { Card } from '@ui-kit/card';
import { Fragment } from 'react';
import { generateMonths } from '@screens/expenseListMonthly/helpers/generateMonths';

export function ExpenseListMonthlyScreen() {
	let intl = useIntl(expenseListMonthlyI18n);
	let months = generateMonths();

	return (
		<>
			<div className={styles.header}>
				<h1>{intl.translate('title')}</h1>
			</div>

			<br />

			{months.map((month) => {
				return (
					<Fragment key={month}>
						<Card>
							<MoneySpentCurrentMonth currentDate={month} />
						</Card>

						<br />
					</Fragment>
				);
			})}
		</>
	);
}
