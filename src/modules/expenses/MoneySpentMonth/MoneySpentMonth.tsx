import { TMonth } from '@domain/amount/useCases/types';
import { useAppConfig } from '@modules/appConfig/useAppConfig';
import { useExpensesStore } from '@modules/expenses';
import { MoneyCard } from '@modules/expenses/moneyCard/moneyCard';

export type TMoneySpentMonthProps = {
	month: TMonth;
};

export function MoneySpentMonth(props: TMoneySpentMonthProps) {
	let appConfig = useAppConfig();
	let total = useExpensesStore((state) => state.getMonthlyAmount(props.month));

	/**
	 * @todo add localization
	 */
	let currentMonth = getMonthNameByIndex(props.month);

	return (
		<MoneyCard title={currentMonth} amount={total} total={appConfig.budget} />
	);
}

function getMonthNameByIndex(month: TMonth): string {
	let months = {
		0: 'Январь',
		1: 'Февраль',
		2: 'Март',
		3: 'Апрель',
		4: 'Май',
		5: 'Июнь',
		6: 'Июль',
		7: 'Август',
		8: 'Сентябрь',
		9: 'Октябрь',
		10: 'Ноябрь',
		11: 'Декабрь',
	};

	let monthName = months[month];

	if (!monthName) {
		return '';
	}

	return monthName;
}
