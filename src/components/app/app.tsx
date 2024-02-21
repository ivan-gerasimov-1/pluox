import { appI18n } from '@components/app/app.i18n';
import { useIntl } from '@modules/intl';
import { EAppPath } from '@root/appPath';
import '@root/root.css';
import { ExpenseListScreen } from '@screens/expenseList';
import { ExpenseListMonthlyScreen } from '@screens/expenseListMonthly';
import { ErrorScreen, MainScreen } from '@screens/index';
import { LogIn } from '@screens/logIn/LogIn';
import { Settings } from '@screens/settings/settings';
import { SignIn } from '@screens/signIn';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

export function App() {
	let intl = useIntl(appI18n);

	return (
		<Router>
			<Routes>
				<Route path={EAppPath.SIGNIN} element={<SignIn />} />
				<Route path={EAppPath.LOGIN} element={<LogIn />} />

				<Route path={EAppPath.MAIN} element={<MainScreen />} />
				<Route path={EAppPath.EXPENSE_LIST} element={<ExpenseListScreen />} />
				<Route
					path={EAppPath.EXPENSE_LIST_MONTHLY}
					element={<ExpenseListMonthlyScreen />}
				/>

				<Route path={EAppPath.SETTINGS} element={<Settings />} />

				<Route
					path="*"
					element={
						<ErrorScreen
							message={intl.translate('errorMessages').pageNotFound}
						/>
					}
				/>
			</Routes>
		</Router>
	);
}
