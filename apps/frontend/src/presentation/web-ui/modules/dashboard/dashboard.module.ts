import { EAppPath } from '@root/presentation/web-ui/appPath';
import type { TRouteObject } from '@root/presentation/web-ui/hooks/useScreenMeta/types';
import { DashboardScreen } from '@root/presentation/web-ui/modules/dashboard/screens/dashboard/dashboard';

export const dashboardRoutes: TRouteObject[] = [
	{
		path: EAppPath.DASHBOARD,
		Component: DashboardScreen,
		handle: {
			/** @todo LV-99 */
			hasNavbar: true,
			hasNavbarActions: true,
		},
	},
];
