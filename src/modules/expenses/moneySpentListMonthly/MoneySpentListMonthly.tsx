import { useExpensesStore } from '@modules/expenses/expenses.store';
import { MoneyCard } from '@modules/expenses/moneyCard/moneyCard';
import { moneySpentListMonthlyI18n } from '@modules/expenses/moneySpentListMonthly/moneySpentListMonthly.i18n';
import { useIntl } from '@modules/intl';

export function MoneySpentListMonthly() {
	let intl = useIntl(moneySpentListMonthlyI18n);
	let total = useExpensesStore((state) => state.getTotalAmount());

	return <MoneyCard title={intl.translate('title')} amount={total} />;
}
