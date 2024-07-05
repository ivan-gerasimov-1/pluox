import {
	createBrowserRouter as createRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';

import { EAppPath } from '@root/appPath';

import { useIntl } from '@modules/intl';

import { appI18n } from '@components/app/app.i18n';

import { ExpenseListScreen } from '@screens/expenseList';
import { ExpenseListMonthlyScreen } from '@screens/expenseListMonthly';
import { ErrorScreen, MainScreen } from '@screens/index';
import { LogIn } from '@screens/logIn/LogIn';
import { Settings } from '@screens/settings/settings';
import { SignIn } from '@screens/signIn';

import '@root/root.css';

export function App() {
	let intl = useIntl(appI18n);

	let router = createRouter(
		createRoutesFromElements(
			<>
				<Route path={EAppPath.SIGNIN} element={<SignIn />} />
				<Route path={EAppPath.LOGIN} element={<LogIn />} />

				<Route path={EAppPath.MAIN} element={<MainScreen />} />
				<Route path={EAppPath.EXPENSES} element={<ExpenseListScreen />} />
				<Route
					path={EAppPath.EXPENSES_LIST_MONTHLY}
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
			</>,
		),
	);

	return <RouterProvider router={router} />;
}
