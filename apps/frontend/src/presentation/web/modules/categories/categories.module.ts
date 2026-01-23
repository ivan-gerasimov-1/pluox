import { EAppPath } from '@/presentation/web/appPath';
import type { TRouteObject } from '@/presentation/web/hooks/useScreenMeta/types';
import { CategoryView } from '@/presentation/web/modules/categories/views/category/categoryView';
import { CategoryListView } from '@/presentation/web/modules/categories/views/categoryList/categoryListView';

export const categoryRoutes: TRouteObject[] = [
	{
		path: EAppPath.CATEGORIES,
		Component: CategoryListView,
		handle: {},
	},
	{
		path: EAppPath.CATEGORIES_VIEW,
		Component: CategoryView,
		handle: {},
	},
];
