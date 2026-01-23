import { EAppPath } from '@/presentation/web/appPath';
import type { TRouteObject } from '@/presentation/web/hooks/useScreenMeta/types';
import { DashboardViewActions } from '@/presentation/web/modules/dashboard/components/dashboardActions/dashboardViewActions';
import { DashboardView } from '@/presentation/web/modules/dashboard/views/dashboard/dashboardView';

export const dashboardRoutes: TRouteObject[] = [
	{
		path: EAppPath.DASHBOARD,
		Component: DashboardView,
		handle: {
			Actions: DashboardViewActions,
		},
	},
];
