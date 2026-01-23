import { EAppPath } from '@/presentation/web-ui/appPath';
import type { TRouteObject } from '@/presentation/web-ui/hooks/useScreenMeta/types';
import { CategoryView } from '@/presentation/web-ui/modules/categories/views/category/categoryView';
import { CategoryListView } from '@/presentation/web-ui/modules/categories/views/categoryList/categoryListView';

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
