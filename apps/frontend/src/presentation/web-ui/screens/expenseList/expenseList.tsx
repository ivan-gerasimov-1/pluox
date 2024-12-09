import { useSearchParams } from 'react-router-dom';

import { dateFn } from '@root/modules/temporal/temporal';

import { ExpenseList } from '@root/presentation/web-ui/modules/expenses/expenseList/expenseList';
import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';

import { expenseListI18n } from '@root/presentation/web-ui/screens/expenseList/expenseList.i18n';

import { Header } from '@root/presentation/web-ui/uiKit/header/header';
import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';

export function ExpenseListScreen() {
	let intl = useIntl(expenseListI18n);
	let screenParams = useScreenParams();

	return (
		<Screen>
			<Header title={intl.translate('title')} />

			<ExpenseList
				dateFrom={screenParams.dateFrom}
				dateTo={screenParams.dateTo}
			/>
		</Screen>
	);
}

function useScreenParams() {
	let [searchParams] = useSearchParams();

	let dateFrom =
		searchParams.get('dateFrom') || dateFn().startOf('month').toISOString();
	let dateTo =
		searchParams.get('dateTo') || dateFn().endOf('month').toISOString();

	return {
		dateFrom,
		dateTo,
	};
}
