import { dashboardViewActionsI18n } from '@/presentation/web-ui/modules/dashboard/components/dashboardActions/dashboardViewActions.i18n';
import { ExpenseNew } from '@/presentation/web-ui/modules/expenses/components/expenseCreate/expenseCreate';
import { useIntl } from '@/presentation/web-ui/modules/intl/useIntl/useIntl';
import { Button } from '@/presentation/web-ui/uiKit/button/button';
import { useDialog } from '@/presentation/web-ui/uiKit/dialog/react/dialog/useDialog';

export function DashboardViewActions() {
	let dialog = useDialog();
	let intl = useIntl(dashboardViewActionsI18n);

	return (
		<Button onClick={() => dialog.render(ExpenseNew)}>
			{intl.translate('addExpense')}
		</Button>
	);
}
