import { useIntl } from '@modules/intl';
import { moneyLeftI18n } from '@modules/expenses/money-left/money-left.i18n';
import { useState } from 'react';
import { MoneyCard } from '../money-card/money-card';

export function MoneyLeft() {
	let intl = useIntl(moneyLeftI18n);
	let [balance] = useState<number>(0);

	return <MoneyCard title={intl.translate('title')} amount={balance} />;
}
