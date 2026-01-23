import { EAppPath } from '@/web/appPath';
import type { TRouteObject } from '@/web/hooks/useScreenMeta/types';
import { SettingsView } from '@/web/modules/settings/views/settings/settingsView';

export const settingsRoutes: TRouteObject[] = [
	{
		path: EAppPath.SETTINGS,
		Component: SettingsView,
		handle: {},
	},
];
