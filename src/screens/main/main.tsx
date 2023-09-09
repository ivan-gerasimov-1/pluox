import { ActionSheet } from '@root/uiKit/actionSheet';
import { MoneyLeft, MoneySpent } from '@modules/expenses';
import { MoneySpentCurrentMonth } from '@modules/expenses/moneySpentCurrentMonth';
import { NewExpense } from '@modules/expenses/newExpense';
import { EAppPath } from '@root/appPath';
import { Card, CardContainer } from '@root/uiKit';
import { Navigable } from '@root/uiKit/navigable/navigable';
import { MoneySpentListMonthly } from '@modules/expenses/moneySpentListMonthly';

export function MainScreen() {
	return (
		<>
			<CardContainer>
				<Navigable to={EAppPath.EXPENSE_LIST}>
					<Card touchable>
						<MoneySpentCurrentMonth currentDate={new Date().toISOString()} />
					</Card>
				</Navigable>

				<Navigable to={EAppPath.EXPENSE_LIST_MONTHLY}>
					<Card touchable>
						<MoneySpentListMonthly />
					</Card>
				</Navigable>

				{/* @todo turn on */}
				{/* <Card>
					<MoneyLeft />
				</Card> */}
			</CardContainer>

			<ActionSheet>
				<NewExpense />
			</ActionSheet>
		</>
	);
}
