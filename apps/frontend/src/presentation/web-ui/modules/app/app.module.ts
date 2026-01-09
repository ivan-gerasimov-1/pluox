import type { TRouteObject } from '@root/presentation/web-ui/hooks/useScreenMeta/types';
import { NotFoundError } from '@root/presentation/web-ui/modules/errors/screens/notFoundError/notFoundError';

export const appRoutes: TRouteObject[] = [
	{
		path: '*',
		Component: NotFoundError,
		handle: {},
	},
];
