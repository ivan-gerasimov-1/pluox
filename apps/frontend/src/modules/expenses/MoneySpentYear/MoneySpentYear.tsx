import { useExpensesStore } from '@modules/expenses/expenses.store';
import { MoneyCard } from '@modules/expenses/moneyCard/moneyCard';
import { moneySpentYearI18n } from '@modules/expenses/MoneySpentYear/moneySpentYear.i18n';
import { useIntl } from '@modules/intl';

export function MoneySpentYear() {
	let intl = useIntl(moneySpentYearI18n);
	let total = useExpensesStore((state) => state.getTotalAmount());

	return <MoneyCard title={intl.translate('title')} amount={total} />;
}
