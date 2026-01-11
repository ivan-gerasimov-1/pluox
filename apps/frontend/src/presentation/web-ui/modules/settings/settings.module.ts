import { EAppPath } from '@/presentation/web-ui/appPath';
import type { TRouteObject } from '@/presentation/web-ui/hooks/useScreenMeta/types';
import { SettingsScreen } from '@/presentation/web-ui/modules/settings/screens/settings/settings';

export const settingsRoutes: TRouteObject[] = [
	{
		path: EAppPath.SETTINGS,
		Component: SettingsScreen,
		handle: {},
	},
];
