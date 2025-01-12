import { createBrowserRouter as createRouter } from 'react-router';

import { EAppPath } from '@root/presentation/web-ui/appPath';

import { NotFoundErrorScreen } from '@root/presentation/web-ui/screens/error/screens/notFoundErrorScreen/notFoundErrorScreen';

import { ExpenseListScreen } from '@root/presentation/web-ui/screens/expenseList/expenseList';
import { ExpenseListMonthlyScreen } from '@root/presentation/web-ui/screens/expenseListMonthly/expenseListMonthly';

import { MainScreen } from '@root/presentation/web-ui/screens/mainV2/main';

import { SettingsScreen } from '@root/presentation/web-ui/screens/settings/settings';

import { SignInScreen } from '@root/presentation/web-ui/screens/signIn/SignIn';
import { SignUpScreen } from '@root/presentation/web-ui/screens/signUp/SignUp';

import { CreateVenueScreen } from '@root/presentation/web-ui/modules/venues/createVenue/createVenueScreen';
import { EditVenueScreen } from '@root/presentation/web-ui/modules/venues/editVenue/editVenueScreen';
import { VenueListScreen } from '@root/presentation/web-ui/modules/venues/venueList/venueListScreen';
import { ViewVenueScreen } from '@root/presentation/web-ui/modules/venues/viewVenue/viewVenueScreen';

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

const VENUE_ROUTES = [
	{
		path: EAppPath.VENUES,
		Component: VenueListScreen,
	},
	{
		path: EAppPath.VENUES_CREATE,
		Component: CreateVenueScreen,
	},
	{
		path: EAppPath.VENUES_VIEW,
		Component: ViewVenueScreen,
	},
	{
		path: EAppPath.VENUES_EDIT,
		Component: EditVenueScreen,
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
		...VENUE_ROUTES,
		...MAIN_ROUTES,

		NOT_FOUND_ROUTE,
	]);
}
