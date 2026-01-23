import { createBrowserRouter as createRouter } from 'react-router';

import { appRoutes } from '@/presentation/web/modules/app/app.module';
import { AppLayout } from '@/presentation/web/modules/app/appLayout';
import { authenticationRoutes } from '@/presentation/web/modules/authentication/authentication.module';
import { AuthenticationLayout } from '@/presentation/web/modules/authentication/authenticationLayout';
import { categoryRoutes } from '@/presentation/web/modules/categories/categories.module';
import { dashboardRoutes } from '@/presentation/web/modules/dashboard/dashboard.module';
import { ErrorLayout } from '@/presentation/web/modules/errors/errorLayout';
import { expenseRoutes } from '@/presentation/web/modules/expenses/expenses.module';
import { settingsRoutes } from '@/presentation/web/modules/settings/settings.module';
import { venueRoutes } from '@/presentation/web/modules/venues/venues.module';

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
