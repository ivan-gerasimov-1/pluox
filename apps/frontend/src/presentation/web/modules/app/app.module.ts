import type { TRouteObject } from '@/presentation/web/hooks/useScreenMeta/types';
import { NotFoundError } from '@/presentation/web/modules/errors/screens/notFoundError/notFoundError';

export const appRoutes: TRouteObject[] = [
	{
		path: '*',
		Component: NotFoundError,
		handle: {},
	},
];
