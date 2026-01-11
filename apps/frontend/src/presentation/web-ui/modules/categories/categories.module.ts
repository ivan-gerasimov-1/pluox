import { EAppPath } from '@/presentation/web-ui/appPath';
import type { TRouteObject } from '@/presentation/web-ui/hooks/useScreenMeta/types';
import { CategoryList } from '@/presentation/web-ui/modules/categories/categoryList/categoryList';
import { CategoryView } from '@/presentation/web-ui/modules/categories/categoryView/categoryView';

export const categoryRoutes: TRouteObject[] = [
	{
		path: EAppPath.CATEGORIES,
		Component: CategoryList,
		handle: {},
	},
	{
		path: EAppPath.CATEGORIES_VIEW,
		Component: CategoryView,
		handle: {},
	},
];
