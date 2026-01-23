import { EAppPath } from '@/presentation/web-ui/appPath';
import type { TRouteObject } from '@/presentation/web-ui/hooks/useScreenMeta/types';
import { DashboardViewActions } from '@/presentation/web-ui/modules/dashboard/components/dashboardActions/dashboardViewActions';
import { DashboardView } from '@/presentation/web-ui/modules/dashboard/views/dashboard/dashboardView';

export const dashboardRoutes: TRouteObject[] = [
	{
		path: EAppPath.DASHBOARD,
		Component: DashboardView,
		handle: {
			Actions: DashboardViewActions,
		},
	},
];
