import { EAppPath } from '@/presentation/web-ui/appPath';
import type { TRouteObject } from '@/presentation/web-ui/hooks/useScreenMeta/types';
import { ExpenseListView } from '@/presentation/web-ui/modules/expenses/views/expenseList/expenseListView';

export const expenseRoutes: TRouteObject[] = [
	{
		path: EAppPath.EXPENSES,
		Component: ExpenseListView,
		handle: {},
	},
];
