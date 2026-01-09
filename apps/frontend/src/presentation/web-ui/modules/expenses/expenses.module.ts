import { EAppPath } from '@root/presentation/web-ui/appPath';
import type { TRouteObject } from '@root/presentation/web-ui/hooks/useScreenMeta/types';
import { ExpenseListScreen } from '@root/presentation/web-ui/modules/expenses/screens/expenseList/expenseList';

export const expenseRoutes: TRouteObject[] = [
	{
		path: EAppPath.EXPENSES,
		Component: ExpenseListScreen,
		handle: {
			hasNavbar: true,
		},
	},
];
