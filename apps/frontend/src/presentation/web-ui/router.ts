import { createBrowserRouter as createRouter } from 'react-router';

import { appRoutes } from '@root/presentation/web-ui/modules/app/app.module';
import { authenticationRoutes } from '@root/presentation/web-ui/modules/authentication/authentication.module';
import { expenseRoutes } from '@root/presentation/web-ui/modules/expenses/expenses.module';
import { settingsRoutes } from '@root/presentation/web-ui/modules/settings/settings.module';
import { venueRoutes } from '@root/presentation/web-ui/modules/venues/venues.module';

type TRouter = ReturnType<typeof createRouter>;
export interface IRouter extends TRouter {}

export function createAppRouter(): IRouter {
	return createRouter([
		...authenticationRoutes,
		...expenseRoutes,
		...venueRoutes,
		...settingsRoutes,
		...appRoutes,
	]);
}
