import { createBrowserRouter as createRouter } from 'react-router';

import { appRoutes } from '@/web/modules/app/app.module';
import { AppLayout } from '@/web/modules/app/appLayout';
// import { authenticationRoutes } from '@/web/modules/authentication/authentication.module';
import { ErrorLayout } from '@/web/modules/errors/errorLayout';

type TRouter = ReturnType<typeof createRouter>;
export interface IRouter extends TRouter {}

export function createAppRouter(): IRouter {
	return createRouter([
		// {
		// 	Component: AuthenticationLayout,
		// 	children: [...authenticationRoutes],
		// },
		{
			Component: AppLayout,
			children: [
				// ...dashboardRoutes,
				// ...expenseRoutes,
				// ...venueRoutes,
				// ...categoryRoutes,
				// ...settingsRoutes,
			],
		},
		{
			Component: ErrorLayout,
			children: [...appRoutes],
		},
	]);
}
