import { EAppPath } from '@root/presentation/web-ui/appPath';
import { SettingsScreen } from '@root/presentation/web-ui/modules/settings/screens/settings/settings';

export const settingsRoutes = [
	{
		path: EAppPath.SETTINGS,
		Component: SettingsScreen,
	},
];
