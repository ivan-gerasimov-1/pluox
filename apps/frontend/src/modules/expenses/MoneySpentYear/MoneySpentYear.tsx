import { useQuery } from '@tanstack/react-query';

import { getTotalAmount } from '@modules/expenses/expenses.query';

import { useIntl } from '@modules/intl/useIntl';
import { moneySpentYearI18n } from '@modules/expenses/MoneySpentYear/moneySpentYear.i18n';

import { MoneyCard } from '@modules/expenses/moneyCard/moneyCard';

export function MoneySpentYear() {
	let intl = useIntl(moneySpentYearI18n);
	let total = useQuery({
		queryKey: ['totalAmount'],
		queryFn: getTotalAmount,
	});

	return <MoneyCard title={intl.translate('title')} amount={total.data} />;
}
