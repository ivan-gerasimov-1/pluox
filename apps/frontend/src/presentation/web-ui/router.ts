import { appRoutes } from '@/presentation/web-ui/modules/app/app.module';
import { AppLayout } from '@/presentation/web-ui/modules/app/appLayout';
import { authenticationRoutes } from '@/presentation/web-ui/modules/authentication/authentication.module';
import { AuthenticationLayout } from '@/presentation/web-ui/modules/authentication/authenticationLayout';
import { categoryRoutes } from '@/presentation/web-ui/modules/categories/categories.module';
import { dashboardRoutes } from '@/presentation/web-ui/modules/dashboard/dashboard.module';
import { ErrorLayout } from '@/presentation/web-ui/modules/errors/errorLayout';
import { expenseRoutes } from '@/presentation/web-ui/modules/expenses/expenses.module';
import { settingsRoutes } from '@/presentation/web-ui/modules/settings/settings.module';
import { venueRoutes } from '@/presentation/web-ui/modules/venues/venues.module';
import { createBrowserRouter as createRouter } from 'react-router';

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
