import { EAppPath } from '@root/presentation/web-ui/appPath';
import type { TRouteObject } from '@root/presentation/web-ui/hooks/useScreenMeta/types';
import { NotFoundErrorScreen } from '@root/presentation/web-ui/modules/app/screens/error/screens/notFoundErrorScreen/notFoundErrorScreen';
import { MainScreen } from '@root/presentation/web-ui/modules/app/screens/main/main';

export const appRoutes: TRouteObject[] = [
	{
		path: EAppPath.MAIN,
		Component: MainScreen,
		handle: {
			/** @todo LV-99 */
			hasNavbar: true,
			hasNavbarActions: true,
		},
	},
	{
		path: '*',
		Component: NotFoundErrorScreen,
		handle: {},
	},
];
