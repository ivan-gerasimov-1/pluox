import { EAppPath } from '@root/presentation/web-ui/appPath';
import { NotFoundErrorScreen } from '@root/presentation/web-ui/modules/app/screens/error/screens/notFoundErrorScreen/notFoundErrorScreen';
import { MainScreen } from '@root/presentation/web-ui/modules/app/screens/main/main';

export const appRoutes = [
	{
		path: EAppPath.MAIN,
		Component: MainScreen,
	},
	{
		path: '*',
		component: NotFoundErrorScreen,
	},
];
