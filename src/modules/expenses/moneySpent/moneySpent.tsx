import { useExpensesStore } from '@modules/expenses';
import { MoneyCard } from '@modules/expenses/moneyCard/moneyCard';
import { moneySpentI18n } from '@modules/expenses/moneySpent/moneySpent.i18n';
import { useIntl } from '@modules/intl';

export function MoneySpent() {
	let intl = useIntl(moneySpentI18n);
	let total = useExpensesStore((state) => state.getTotalAmount());

	return <MoneyCard title={intl.translate('title')} amount={total} />;
}
