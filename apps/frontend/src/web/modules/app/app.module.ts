import type { TRouteObject } from '@/web/hooks/useScreenMeta/types';

import { NotFoundError } from '@/web/modules/errors/screens/notFoundError/notFoundError';

export const appRoutes: TRouteObject[] = [
	{
		path: '*',
		Component: NotFoundError,
		handle: {},
	},
];
