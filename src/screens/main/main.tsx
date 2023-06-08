import { ActionSheet } from '@components/action-sheet';
import { MoneyLeft, MoneySpent } from '@modules/expenses';
import { MoneySpentCurrentMonth } from '@modules/expenses/money-spent-current-month';
import { NewExpense } from '@modules/expenses/new-expense';
import { EAppPath } from '@root/app-path';
import { ActionSheetContainer } from '@root/screens/main/components/action-sheet-container /action-sheet-container';
import { Card, CardContainer } from '@root/ui-kit';
import { Navigable } from '@root/ui-kit/navigable/navigable';

export function MainScreen() {
	return (
		<>
			<CardContainer>
				<Card>
					<MoneySpentCurrentMonth />
				</Card>

				<Navigable to={EAppPath.EXPENSE_LIST}>
					<Card touchable>
						<MoneySpent />
					</Card>
				</Navigable>

				<Card>
					<MoneyLeft />
				</Card>
			</CardContainer>

			<ActionSheetContainer>
				<ActionSheet>
					<NewExpense />
				</ActionSheet>
			</ActionSheetContainer>
		</>
	);
}
