import { useSearchParams } from 'react-router';

import { ExpenseList } from '@/presentation/web-ui/modules/expenses/components/expenseList/expenseList';
import { EServiceToken } from '@/presentation/web-ui/modules/serviceContainer/enums';
import { useService } from '@/presentation/web-ui/modules/serviceContainer/useService';

export function ExpenseListScreen() {
	let temporal = useService(EServiceToken.TEMPORAL);
	let [searchParams] = useSearchParams();

	let dateFrom = searchParams.get('dateFrom') || temporal.getStartOfMonth();
	let dateTo = searchParams.get('dateTo') || temporal.getEndOfMonth();

	return <ExpenseList dateFrom={dateFrom} dateTo={dateTo} />;
}
