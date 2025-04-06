import { EAppPath } from '@root/presentation/web-ui/appPath';
import { NotFoundErrorScreen } from '@root/presentation/web-ui/modules/app/screens/error/screens/notFoundErrorScreen/notFoundErrorScreen';
import {
	MainScreen,
	MainScreenHeader,
} from '@root/presentation/web-ui/modules/app/screens/main/main';

export const appRoutes = [
	{
		path: EAppPath.MAIN,
		Component: MainScreen,
		handle: {
			TitleComponent: MainScreenHeader,
			/** @todo LV-99 */
			hasNavbar: true,
		},
	},
	{
		path: '*',
		component: NotFoundErrorScreen,
		handle: {
			title: 'Error',
		},
	},
];
