import { EAppPath } from '@root/presentation/web-ui/appPath';
import { ExpenseListScreen } from '@root/presentation/web-ui/modules/expenses/screens/expenseList/expenseList';

export const expenseRoutes = [
	{
		path: EAppPath.EXPENSES,
		Component: ExpenseListScreen,
		handle: {
			title: 'Expenses',
			hasNavbar: true,
		},
	},
];
