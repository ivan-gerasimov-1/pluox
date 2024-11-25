import { createBrowserRouter as createRouter } from 'react-router-dom';

import { EAppPath } from '@root/appPath';

import { NotFoundErrorScreen } from '@screens/error/screens/notFoundErrorScreen/notFoundErrorScreen';
import { ExpenseListScreen } from '@screens/expenseList';
import { ExpenseListMonthlyScreen } from '@screens/expenseListMonthly';
import { MainScreen } from '@screens/main';
import { SettingsScreen } from '@screens/settings/settings';
import { SignInScreen } from '@screens/signIn/SignIn';
import { SignUpScreen } from '@screens/signUp/SignUp';

type TRouter = ReturnType<typeof createRouter>;
export interface IRouter extends TRouter {}

const AUTHENTICATION_ROUTES = [
	{
		path: EAppPath.SIGNUP,
		Component: SignUpScreen,
	},
	{
		path: EAppPath.SIGNIN,
		Component: SignInScreen,
	},
];

const EXPENSE_ROUTES = [
	{
		path: EAppPath.EXPENSES,
		Component: ExpenseListScreen,
	},
	{
		path: EAppPath.EXPENSES_LIST_MONTHLY,
		Component: ExpenseListMonthlyScreen,
	},
];

const MAIN_ROUTES = [
	{
		path: EAppPath.MAIN,
		Component: MainScreen,
	},

	{
		path: EAppPath.SETTINGS,
		Component: SettingsScreen,
	},
];

const NOT_FOUND_ROUTE = {
	path: '*',
	component: NotFoundErrorScreen,
};

export function createAppRouter(): IRouter {
	return createRouter([
		...AUTHENTICATION_ROUTES,
		...EXPENSE_ROUTES,
		...MAIN_ROUTES,

		NOT_FOUND_ROUTE,
	]);
}
