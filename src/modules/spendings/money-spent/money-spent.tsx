import { useIntl } from '@modules/intl';
import { moneySpentI18n } from '@modules/spendings/money-spent/money-spent.i18n';
import {
	$spendings,
	ISpendingsStore,
	totalSelector,
} from '@modules/spendings/spendings.store';
import { useSelector } from '@root/utils/store';
import { MoneyCard } from '../money-card/money-card';

export function MoneySpent() {
	let intl = useIntl(moneySpentI18n);
	let total = useSelector<ISpendingsStore, number>($spendings, totalSelector, {
		field: 'operations',
		defaultValue: 0,
	});

	return <MoneyCard title={intl.translate('title')} amount={total} />;
}
