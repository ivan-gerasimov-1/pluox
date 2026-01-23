import { useSearchParams } from 'react-router';

import { ExpenseList } from '@/presentation/web/modules/expenses/components/expenseList/expenseList';
import { EServiceToken } from '@/presentation/web/modules/serviceContainer/enums';
import { useService } from '@/presentation/web/modules/serviceContainer/useService';

export function ExpenseListView() {
	let temporal = useService(EServiceToken.TEMPORAL);
	let [searchParams] = useSearchParams();

	let dateFrom = searchParams.get('dateFrom') || temporal.getStartOfMonth();
	let dateTo = searchParams.get('dateTo') || temporal.getEndOfMonth();

	return <ExpenseList dateFrom={dateFrom} dateTo={dateTo} />;
}
