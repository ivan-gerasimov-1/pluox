import { ELocaleCode } from '@root/core/modules/intl/domain/enums';

import { EAppPath } from '@root/presentation/web-ui/appPath';
import type { TRouteObject } from '@root/presentation/web-ui/hooks/useScreenMeta/types';
import { SettingsScreen } from '@root/presentation/web-ui/modules/settings/screens/settings/settings';

export const settingsRoutes: TRouteObject[] = [
	{
		path: EAppPath.SETTINGS,
		Component: SettingsScreen,
		handle: {
			title: {
				[ELocaleCode.EN_US]: 'Settings',
				[ELocaleCode.RU_RU]: 'Настройки',
			},
			hasNavbar: true,
		},
	},
];
