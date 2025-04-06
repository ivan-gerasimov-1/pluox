import { EAppPath } from '@root/presentation/web-ui/appPath';

import type { TRouteObject } from '@root/presentation/web-ui/hooks/useScreenMeta/types';

import { SettingsScreen } from '@root/presentation/web-ui/modules/settings/screens/settings/settings';

export const settingsRoutes: TRouteObject[] = [
	{
		path: EAppPath.SETTINGS,
		Component: SettingsScreen,
		handle: {
			title: 'Settings',
			hasNavbar: true,
		},
	},
];
