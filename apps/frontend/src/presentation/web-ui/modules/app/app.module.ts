import type { TRouteObject } from '@root/presentation/web-ui/hooks/useScreenMeta/types';
import { NotFoundErrorScreen } from '@root/presentation/web-ui/modules/app/screens/error/screens/notFoundErrorScreen/notFoundErrorScreen';

export const appRoutes: TRouteObject[] = [
	{
		path: '*',
		Component: NotFoundErrorScreen,
		handle: {},
	},
];
