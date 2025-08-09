import type { TRouteObject } from '@root/presentation/web-ui/hooks/useScreenMeta/types';

import { EAppPath } from '@root/presentation/web-ui/appPath';

import { CategoryList } from '@root/presentation/web-ui/modules/categories/categoryList/categoryList';
import { CategoryView } from '@root/presentation/web-ui/modules/categories/categoryView/categoryView';

export const categoryRoutes: TRouteObject[] = [
	{
		path: EAppPath.CATEGORIES,
		Component: CategoryList,
		handle: {
			title: 'Categories',
			hasNavbar: true,
		},
	},
	{
		path: EAppPath.CATEGORIES_VIEW,
		Component: CategoryView,
		handle: {
			title: 'Category',
			hasNavbar: true,
		},
	},
];
