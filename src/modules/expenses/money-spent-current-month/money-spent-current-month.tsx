import { useExpensesStore } from '@modules/expenses';
import { MoneyCard } from '@modules/expenses/money-card/money-card';
import { moneySpentI18n } from '@modules/expenses/money-spent-current-month/money-spent-current-month.i18n';
import { useIntl } from '@modules/intl';

export function MoneySpentCurrentMonth() {
	let intl = useIntl(moneySpentI18n);
	let total = useExpensesStore((state) => state.getMonthlyAmount());

	return (
		<MoneyCard title={intl.translate('title')} amount={total} total={4800} />
	);
}
