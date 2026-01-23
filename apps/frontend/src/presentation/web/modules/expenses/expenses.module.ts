import { EAppPath } from '@/presentation/web/appPath';
import type { TRouteObject } from '@/presentation/web/hooks/useScreenMeta/types';
import { ExpenseListView } from '@/presentation/web/modules/expenses/views/expenseList/expenseListView';

export const expenseRoutes: TRouteObject[] = [
	{
		path: EAppPath.EXPENSES,
		Component: ExpenseListView,
		handle: {},
	},
];
