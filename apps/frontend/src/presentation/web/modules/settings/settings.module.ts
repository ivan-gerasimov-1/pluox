import { EAppPath } from '@/presentation/web/appPath';
import type { TRouteObject } from '@/presentation/web/hooks/useScreenMeta/types';
import { SettingsView } from '@/presentation/web/modules/settings/views/settings/settingsView';

export const settingsRoutes: TRouteObject[] = [
	{
		path: EAppPath.SETTINGS,
		Component: SettingsView,
		handle: {},
	},
];
