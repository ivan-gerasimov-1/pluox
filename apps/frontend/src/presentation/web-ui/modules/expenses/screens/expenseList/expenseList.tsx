import { useSearchParams } from 'react-router';

import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';

import { ExpenseList } from '@root/presentation/web-ui/modules/expenses/components/expenseList/expenseList';
import { TMonth } from '@root/core/domain/temporal/types';

export function ExpenseListScreen() {
	let screenData = useScreenLoader();

	return (
		<ExpenseList dateFrom={screenData.dateFrom} dateTo={screenData.dateTo} />
	);
}

function useScreenLoader() {
	let temporal = useService(EServiceToken.TEMPORAL);
	let [searchParams] = useSearchParams();

	let dateFrom =
		searchParams.get('dateFrom') ||
		temporal.getStartOfMonth(
			/** @todo | REMOVE */
			(new Date().getMonth() - 1) as TMonth,
		);
	let dateTo = searchParams.get('dateTo') || temporal.getEndOfMonth();

	return {
		dateFrom,
		dateTo,
	};
}
