import { EAppPath } from '@/presentation/web-ui/appPath';
import type { TRouteObject } from '@/presentation/web-ui/hooks/useScreenMeta/types';
import { ExpenseListScreen } from '@/presentation/web-ui/modules/expenses/screens/expenseList/expenseList';

export const expenseRoutes: TRouteObject[] = [
	{
		path: EAppPath.EXPENSES,
		Component: ExpenseListScreen,
		handle: {},
	},
];
