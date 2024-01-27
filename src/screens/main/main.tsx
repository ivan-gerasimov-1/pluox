import {
	AuthService,
	UserStorage,
} from '@core/infrastructure/authService/AuthService';
import { useAppConfig } from '@modules/appConfig/useAppConfig';
import { MoneySpentMonth } from '@modules/expenses/MoneySpentMonth';
import { MoneySpentYear } from '@modules/expenses/MoneySpentYear';
import { AddExpense } from '@modules/expenses/addExpense/AddExpense';
import { useNavigation } from '@modules/navigation/useNavigation';
import { EAppPath } from '@root/appPath';
import { Card, CardContainer } from '@root/uiKit';
import { ActionSheet } from '@root/uiKit/actionSheet';
import { Navigable } from '@root/uiKit/navigable/navigable';

export function MainScreen() {
	let appConfig = useAppConfig();
	let navigation = useNavigation();
	let isAuthenticated = AuthService.getInstance().check();
	let user = UserStorage.getInstance().get();

	return (
		<>
			<CardContainer>
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

				<br />
				<br />

				{isAuthenticated ? (
					<>
						<Card>
							<strong>{user?.email}</strong>

							<br />
							<br />

							<div>
								<Navigable to={EAppPath.SETTINGS}>
									<button>Настройки</button>
								</Navigable>
							</div>

							<br />

							<div>
								<button
									onClick={() => {
										AuthService.getInstance().signOut();

										navigation.mainPage();
									}}
								>
									Выйти
								</button>
							</div>
						</Card>
					</>
				) : (
					<>
						<Navigable to={EAppPath.SIGNIN}>
							<Card touchable>Регистрация</Card>
						</Navigable>

						<Navigable to={EAppPath.LOGIN}>
							<Card touchable>Вход</Card>
						</Navigable>
					</>
				)}
			</CardContainer>

			<ActionSheet>
				<AddExpense />
			</ActionSheet>
		</>
	);
}
