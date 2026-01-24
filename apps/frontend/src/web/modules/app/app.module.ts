import type { TRouteObject } from '@/web/hooks/useRouteMeta/types';

import { NotFoundErrorView } from '@/web/modules/errors/views/notFoundError/notFoundErrorView';

export const appRoutes: TRouteObject[] = [
	{
		path: '*',
		Component: NotFoundErrorView,
		handle: {},
	},
];
