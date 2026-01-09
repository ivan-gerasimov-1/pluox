import { createBrowserRouter as createRouter } from 'react-router';

import { appRoutes } from '@root/presentation/web-ui/modules/app/app.module';
import { AppScreen } from '@root/presentation/web-ui/modules/app/components/appScreen/appScreen';
import { ErrorLayout } from '@root/presentation/web-ui/modules/app/screens/error/errorLayout';
import { authenticationRoutes } from '@root/presentation/web-ui/modules/authentication/authentication.module';
import { categoryRoutes } from '@root/presentation/web-ui/modules/categories/categories.module';
import { dashboardRoutes } from '@root/presentation/web-ui/modules/dashboard/dashboard.module';
import { expenseRoutes } from '@root/presentation/web-ui/modules/expenses/expenses.module';
import { settingsRoutes } from '@root/presentation/web-ui/modules/settings/settings.module';
import { venueRoutes } from '@root/presentation/web-ui/modules/venues/venues.module';

type TRouter = ReturnType<typeof createRouter>;
export interface IRouter extends TRouter {}

export function createAppRouter(): IRouter {
	return createRouter([
		...authenticationRoutes,
		{
			Component: AppScreen,
			children: [
				...dashboardRoutes,
				...expenseRoutes,
				...venueRoutes,
				...categoryRoutes,
				...settingsRoutes,
			],
		},
		{
			Component: ErrorLayout,
			children: [...appRoutes],
		},
	]);
}
