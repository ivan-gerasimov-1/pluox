import { IntlService } from '@core/infrastructure/intl/intlService/IntlService';
import { getCategoryName } from '@domain/categories/getCategoryName';
import { Expenses } from '@domain/expenses/expenses';
import { useAppConfig } from '@modules/appConfig/useAppConfig';
import { MoneySpentMonth } from '@modules/expenses/MoneySpentMonth';
import { MoneySpentYear } from '@modules/expenses/MoneySpentYear';
import { AddExpense } from '@modules/expenses/addExpense/AddExpense';
import { EAppPath } from '@root/appPath';
import { Card, CardContainer } from '@root/uiKit';
import { ActionSheet } from '@root/uiKit/actionSheet';
import { Navigable } from '@root/uiKit/navigable/navigable';
import { Header } from '@screens/main/components /header';

export function MainScreen() {
	let appConfig = useAppConfig();

	let expenses = Expenses.getInstance()
		// @ts-expect-error
		.getMonthlyExpensesByCategory();

	console.log(expenses);

	return (
		<>
			<CardContainer>
				<Header />
				<Navigable to={EAppPath.EXPENSE_LIST}>
					<Card touchable>
						<MoneySpentMonth month={appConfig.currentMonth} />
					</Card>
				</Navigable>

				<Card>
					{Object.entries(expenses).map(([category, amount]) => {
						return (
							<>
								<div>
									{getCategoryName(category)}:{' '}
									<strong>
										{IntlService.getInstance().formatCurrency(amount as number)}
									</strong>
								</div>
							</>
						);
					})}
				</Card>

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
