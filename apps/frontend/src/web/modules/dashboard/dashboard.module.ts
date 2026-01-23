import { EAppPath } from '@/web/appPath';
import type { TRouteObject } from '@/web/hooks/useScreenMeta/types';
import { DashboardViewActions } from '@/web/modules/dashboard/components/dashboardActions/dashboardViewActions';
import { DashboardView } from '@/web/modules/dashboard/views/dashboard/dashboardView';

export const dashboardRoutes: TRouteObject[] = [
	{
		path: EAppPath.DASHBOARD,
		Component: DashboardView,
		handle: {
			Actions: DashboardViewActions,
		},
	},
];
