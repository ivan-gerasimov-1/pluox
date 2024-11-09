import { dateFn } from '@modules/date/date';
import { ExpenseList } from '@modules/expenses';
import { useIntl } from '@modules/intl/useIntl';

import { expenseListI18n } from '@screens/expenseList/expenseList.i18n';

import { Header } from '@uiKit/header/header';
import { Screen } from '@uiKit/screen/screen';

export function ExpenseListScreen() {
	let intl = useIntl(expenseListI18n);

	let dateFrom = dateFn().startOf('month').toISOString();
	let dateTo = dateFn().endOf('month').toISOString();

	return (
		<Screen>
			<Header title={intl.translate('title')} />

			<ExpenseList dateFrom={dateFrom} dateTo={dateTo} />
		</Screen>
	);
}
