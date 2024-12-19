import { createBrowserRouter as createRouter } from 'react-router';

import { EAppPath } from '@root/presentation/web-ui/appPath';

import { NotFoundErrorScreen } from '@root/presentation/web-ui/screens/error/screens/notFoundErrorScreen/notFoundErrorScreen';
import { ExpenseListScreen } from '@root/presentation/web-ui/screens/expenseList/expenseList';
import { ExpenseListMonthlyScreen } from '@root/presentation/web-ui/screens/expenseListMonthly/expenseListMonthly';
import { MainScreen } from '@root/presentation/web-ui/screens/main/main';
import { SettingsScreen } from '@root/presentation/web-ui/screens/settings/settings';
import { SignInScreen } from '@root/presentation/web-ui/screens/signIn/SignIn';
import { SignUpScreen } from '@root/presentation/web-ui/screens/signUp/SignUp';

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
