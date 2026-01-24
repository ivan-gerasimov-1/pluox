import { EAppPath } from '@/web/appPath';

import type { TRouteObject } from '@/web/hooks/useRouteMeta/types';

import { ExpenseListView } from '@/web/modules/expenses/views/expenseList/expenseListView';

export const expenseRoutes: TRouteObject[] = [
	{
		path: EAppPath.EXPENSES,
		Component: ExpenseListView,
		handle: {},
	},
];
