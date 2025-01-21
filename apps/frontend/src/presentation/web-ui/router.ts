import { createBrowserRouter as createRouter } from 'react-router';

import { EAppPath } from '@root/presentation/web-ui/appPath';

import { NotFoundErrorScreen } from '@root/presentation/web-ui/screens/error/screens/notFoundErrorScreen/notFoundErrorScreen';

import { MainScreen } from '@root/presentation/web-ui/screens/main/main';

import { SignInScreen } from '@root/presentation/web-ui/screens/signIn/SignIn';
import { SignUpScreen } from '@root/presentation/web-ui/screens/signUp/SignUp';

import { expenseRoutes } from '@root/presentation/web-ui/modules/expenses/expenses.module';
import { venueRoutes } from '@root/presentation/web-ui/modules/venues/venues.module';
import { settingsRoutes } from '@root/presentation/web-ui/modules/settings/settings.module';

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

const MAIN_ROUTES = [
	{
		path: EAppPath.MAIN,
		Component: MainScreen,
	},
];

const NOT_FOUND_ROUTE = {
	path: '*',
	component: NotFoundErrorScreen,
};

export function createAppRouter(): IRouter {
	return createRouter([
		...AUTHENTICATION_ROUTES,
		...expenseRoutes,
		...venueRoutes,
		...settingsRoutes,
		...MAIN_ROUTES,

		NOT_FOUND_ROUTE,
	]);
}
