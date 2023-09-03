import { ActionSheet } from '@ui-kit/actionSheet';
import { MoneyLeft, MoneySpent } from '@modules/expenses';
import { MoneySpentCurrentMonth } from '@modules/expenses/money-spent-current-month';
import { NewExpense } from '@modules/expenses/new-expense';
import { EAppPath } from '@root/app-path';
import { Card, CardContainer } from '@root/ui-kit';
import { Navigable } from '@root/ui-kit/navigable/navigable';
import { MoneySpentListMonthly } from '@modules/expenses/moneySpentListMonthly';

export function MainScreen() {
	return (
		<>
			<CardContainer>
				<Card>
					<MoneySpentCurrentMonth currentDate={new Date().toISOString()} />
				</Card>

				<Navigable to={EAppPath.EXPENSE_LIST}>
					<Card touchable>
						<MoneySpent />
					</Card>
				</Navigable>

				<Navigable to={EAppPath.EXPENSE_LIST_MONTHLY}>
					<Card touchable>
						<MoneySpentListMonthly />
					</Card>
				</Navigable>

				<Card>
					<MoneyLeft />
				</Card>
			</CardContainer>

			<ActionSheet>
				<NewExpense />
			</ActionSheet>
		</>
	);
}
