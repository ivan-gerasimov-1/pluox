import { dashboardViewActionsI18n } from '@/web/modules/dashboard/components/dashboardActions/dashboardViewActions.i18n';
import { ExpenseNew } from '@/web/modules/expenses/components/expenseCreate/expenseCreate';
import { useIntl } from '@/web/modules/intl/useIntl/useIntl';

import { Button } from '@/web/uiKit/button/button';
import { useDialog } from '@/web/uiKit/dialog/react/dialog/useDialog';

export function DashboardViewActions() {
	let dialog = useDialog();
	let intl = useIntl(dashboardViewActionsI18n);

	return (
		<Button onClick={() => dialog.render(ExpenseNew)}>
			{intl.translate('addExpense')}
		</Button>
	);
}
