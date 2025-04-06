import { useSearchParams } from 'react-router';

import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';
import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';

import { ExpenseList } from '@root/presentation/web-ui/modules/expenses/components/expenseList/expenseList';
import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';

import { expenseListI18n } from '@root/presentation/web-ui/modules/expenses/screens/expenseList/expenseList.i18n';

import { Header } from '@root/presentation/web-ui/uiKit/header/header';
import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';
import { ScreenBody } from '@root/presentation/web-ui/uiKit/screen/screenBody';

export function ExpenseListScreen() {
	let intl = useIntl(expenseListI18n);
	let screenData = useScreenLoader();

	return (
		<ExpenseList dateFrom={screenData.dateFrom} dateTo={screenData.dateTo} />
		// <Screen hasNavbar>
		// 	<Header title={intl.translate('title')} />

		// 	<ScreenBody>
		// 		<ExpenseList
		// 			dateFrom={screenData.dateFrom}
		// 			dateTo={screenData.dateTo}
		// 		/>
		// 	</ScreenBody>
		// </Screen>
	);
}

function useScreenLoader() {
	let temporal = useService(EServiceToken.TEMPORAL);
	let [searchParams] = useSearchParams();

	let dateFrom = searchParams.get('dateFrom') || temporal.getStartOfMonth();
	let dateTo = searchParams.get('dateTo') || temporal.getEndOfMonth();

	return {
		dateFrom,
		dateTo,
	};
}
