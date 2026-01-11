import type { TRouteObject } from '@/presentation/web-ui/hooks/useScreenMeta/types';
import { NotFoundError } from '@/presentation/web-ui/modules/errors/screens/notFoundError/notFoundError';

export const appRoutes: TRouteObject[] = [
	{
		path: '*',
		Component: NotFoundError,
		handle: {},
	},
];
