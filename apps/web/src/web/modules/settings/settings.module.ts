import { EAppPath } from '@/web/appPath';

import type { TRouteObject } from '@/web/hooks/useRouteMeta/types';

import { SettingsView } from '@/web/modules/settings/views/settings/settingsView';

export const settingsRoutes: TRouteObject[] = [
	{
		path: EAppPath.SETTINGS,
		Component: SettingsView,
		handle: {},
	},
];
