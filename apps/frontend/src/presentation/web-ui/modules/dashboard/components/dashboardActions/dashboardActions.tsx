import { dashboardActionsI18n } from '@root/presentation/web-ui/modules/dashboard/components/dashboardActions/dashboardActions.i18n';
import { ExpenseNew } from '@root/presentation/web-ui/modules/expenses/components/expenseNew/addExpense';
import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import { Button } from '@root/presentation/web-ui/uiKit/button/button';
import { useDialog } from '@root/presentation/web-ui/uiKit/dialog/react/dialog/useDialog';

export function DashboardActions() {
	let dialog = useDialog();
	let intl = useIntl(dashboardActionsI18n);

	return (
		<Button onClick={() => dialog.render(ExpenseNew)}>
			{intl.translate('addExpense')}
		</Button>
	);
}
