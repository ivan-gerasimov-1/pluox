import { EAppPath } from '@/web/appPath';

import type { TRouteObject } from '@/web/hooks/useScreenMeta/types';

import { CategoryView } from '@/web/modules/categories/views/category/categoryView';
import { CategoryListView } from '@/web/modules/categories/views/categoryList/categoryListView';

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
