import { createBrowserRouter as createRouter } from 'react-router';

import { appRoutes } from '@/web/modules/app/app.module';
import { AppLayout } from '@/web/modules/app/appLayout';
import { authenticationRoutes } from '@/web/modules/authentication/authentication.module';
import { AuthenticationLayout } from '@/web/modules/authentication/authenticationLayout';
import { categoryRoutes } from '@/web/modules/categories/categories.module';
import { dashboardRoutes } from '@/web/modules/dashboard/dashboard.module';
import { ErrorLayout } from '@/web/modules/errors/errorLayout';
import { expenseRoutes } from '@/web/modules/expenses/expenses.module';
import { settingsRoutes } from '@/web/modules/settings/settings.module';
import { venueRoutes } from '@/web/modules/venues/venues.module';

type TRouter = ReturnType<typeof createRouter>;
export interface IRouter extends TRouter {}

export function createAppRouter(): IRouter {
	return createRouter([
		{
			Component: AuthenticationLayout,
			children: [...authenticationRoutes],
		},
		{
			Component: AppLayout,
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
