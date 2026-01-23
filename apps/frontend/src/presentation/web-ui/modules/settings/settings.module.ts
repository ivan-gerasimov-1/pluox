import { EAppPath } from '@/presentation/web-ui/appPath';
import type { TRouteObject } from '@/presentation/web-ui/hooks/useScreenMeta/types';
import { SettingsView } from '@/presentation/web-ui/modules/settings/views/settings/settingsView';

export const settingsRoutes: TRouteObject[] = [
	{
		path: EAppPath.SETTINGS,
		Component: SettingsView,
		handle: {},
	},
];
