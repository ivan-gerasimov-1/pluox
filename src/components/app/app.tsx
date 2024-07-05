import {
	createBrowserRouter as createRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';

import { EAppPath } from '@root/appPath';

import { ExpenseListScreen } from '@screens/expenseList';
import { ExpenseListMonthlyScreen } from '@screens/expenseListMonthly';
import { MainScreen } from '@screens/index';
import { LogIn } from '@screens/logIn/LogIn';
import { Settings } from '@screens/settings/settings';
import { SignIn } from '@screens/signIn';
import { NotFoundErrorScreen } from '@screens/error/screens/notFoundErrorScreen/notFoundErrorScreen';

import '@root/root.css';

export function App() {
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

				<Route path="*" element={<NotFoundErrorScreen />} />
			</>,
		),
	);

	return <RouterProvider router={router} />;
}
