import { useAppConfig } from '@modules/appConfig/useAppConfig';
import { MoneySpentMonth } from '@modules/expenses/MoneySpentMonth';
import { MoneySpentYear } from '@modules/expenses/MoneySpentYear';
import { AddExpense } from '@modules/expenses/addExpense/AddExpense';
import { EAppPath } from '@root/appPath';
import { Card, CardContainer } from '@root/uiKit';
import { ActionSheet } from '@root/uiKit/actionSheet';
import { Navigable } from '@root/uiKit/navigable/navigable';
import { Header } from '@uiKit/header/header';

export function MainScreen() {
	let appConfig = useAppConfig();

	return (
		<>
			<CardContainer>
				<Header />

				<Navigable to={EAppPath.EXPENSE_LIST}>
					<Card touchable>
						<MoneySpentMonth month={appConfig.currentMonth} />
					</Card>
				</Navigable>

				<Navigable to={EAppPath.EXPENSE_LIST_MONTHLY}>
					<Card touchable>
						<MoneySpentYear />
					</Card>
				</Navigable>
			</CardContainer>

			<ActionSheet>
				<AddExpense />
			</ActionSheet>
		</>
	);
}
