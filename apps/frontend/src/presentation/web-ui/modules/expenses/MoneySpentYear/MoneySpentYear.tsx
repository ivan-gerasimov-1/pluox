import { useQuery } from '@tanstack/react-query';

import {
	getTotalAmount,
	QUERY_EXPENSES_TOTAL_AMOUNT,
} from '@root/presentation/web-ui/modules/expenses/expenses.query';
import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import { moneySpentYearI18n } from '@root/presentation/web-ui/modules/expenses/MoneySpentYear/moneySpentYear.i18n';
import { MoneyCard } from '@root/presentation/web-ui/modules/expenses/moneyCard/moneyCard';

export function MoneySpentYear() {
	let intl = useIntl(moneySpentYearI18n);
	let total = useQuery({
		queryKey: [QUERY_EXPENSES_TOTAL_AMOUNT],
		queryFn: getTotalAmount,
		refetchOnMount: false,
	});

	return <MoneyCard title={intl.translate('title')} amount={total.data} />;
}
