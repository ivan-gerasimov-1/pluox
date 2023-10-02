import { useAppConfig } from '@modules/appConfig/useAppConfig';
import { MoneySpentMonthly } from '@modules/expenses/MoneySpentMonthly';
import { MoneySpentListMonthly } from '@modules/expenses/moneySpentListMonthly';
import { NewExpense } from '@modules/expenses/newExpense';
import { EAppPath } from '@root/appPath';
import { Card, CardContainer } from '@root/uiKit';
import { ActionSheet } from '@root/uiKit/actionSheet';
import { Navigable } from '@root/uiKit/navigable/navigable';
import { getCurrentMonth } from '@screens/main/helpers';

export function MainScreen() {
	let appConfig = useAppConfig();

	return (
		<>
			<CardContainer>
				<Navigable to={EAppPath.EXPENSE_LIST}>
					<Card touchable>
						<MoneySpentMonthly month={appConfig.currentMonth} />
					</Card>
				</Navigable>

				<Navigable to={EAppPath.EXPENSE_LIST_MONTHLY}>
					<Card touchable>
						<MoneySpentListMonthly />
					</Card>
				</Navigable>
			</CardContainer>

			<ActionSheet>
				<NewExpense />
			</ActionSheet>
		</>
	);
}
