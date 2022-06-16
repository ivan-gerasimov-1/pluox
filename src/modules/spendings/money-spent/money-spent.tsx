import { useIntl } from '@modules/intl';
import { MoneyCard } from '@modules/spendings/money-card/money-card';
import { moneySpentI18n } from '@modules/spendings/money-spent/money-spent.i18n';
import {
	$spendings,
	$spendingsSelector,
	TSpendingsStore,
} from '@modules/spendings/spendings.store';
import { useSelector } from '@root/utils/store';

export function MoneySpent() {
	let intl = useIntl(moneySpentI18n);
	let total = useSelector<TSpendingsStore, number>(
		$spendings,
		$spendingsSelector.total.fn,
		{
			field: $spendingsSelector.total.field,
			defaultValue: 0,
		}
	);

	return <MoneyCard title={intl.translate('title')} amount={total} />;
}
