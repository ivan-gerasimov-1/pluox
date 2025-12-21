import { ELocaleCode } from '@root/core/modules/intl/domain/enums';

import { EAppPath } from '@root/presentation/web-ui/appPath';
import type { TRouteObject } from '@root/presentation/web-ui/hooks/useScreenMeta/types';
import { CategoryList } from '@root/presentation/web-ui/modules/categories/categoryList/categoryList';
import { CategoryView } from '@root/presentation/web-ui/modules/categories/categoryView/categoryView';

export const categoryRoutes: TRouteObject[] = [
	{
		path: EAppPath.CATEGORIES,
		Component: CategoryList,
		handle: {
			title: {
				[ELocaleCode.EN_US]: 'Categories',
				[ELocaleCode.RU_RU]: 'Категории',
			},
			hasNavbar: true,
		},
	},
	{
		path: EAppPath.CATEGORIES_VIEW,
		Component: CategoryView,
		handle: {
			title: {
				[ELocaleCode.EN_US]: 'Category',
				[ELocaleCode.RU_RU]: 'Категория',
			},
			hasNavbar: true,
		},
	},
];
