import { TMonth } from '@domain/amount/useCases/types';
import { TISODateString } from '@domain/types';
import { useAppConfig } from '@modules/appConfig/useAppConfig';
import { useExpensesStore } from '@modules/expenses';
import { MoneyCard } from '@modules/expenses/moneyCard/moneyCard';

export type TMoneySpentCurrentMonthProps = {
	currentDate: TISODateString;
};

export function MoneySpentMonthly(props: TMoneySpentCurrentMonthProps) {
	let total = useExpensesStore((state) =>
		state.getMonthlyAmount(props.currentDate),
	);
	let appConfig = useAppConfig();
	/**
	 * @todo add localization
	 */
	let currentMonth = getMonthByIndex(
		new Date(props.currentDate).getMonth() as TMonth,
	);

	return (
		<MoneyCard title={currentMonth} amount={total} total={appConfig.budget} />
	);
}

function getMonthByIndex(index: TMonth): string {
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

	let currentMonth = months[index];

	if (!currentMonth) {
		return '';
	}

	return currentMonth;
}
