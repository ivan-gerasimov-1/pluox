import { TMonth } from '@domain/expenses/use-cases/types';
import { TISODateString } from '@domain/types';
import { useAppConfig } from '@modules/appConfig/useAppConfig';
import { useExpensesStore } from '@modules/expenses';
import { MoneyCard } from '@modules/expenses/money-card/money-card';
import { moneySpentI18n } from '@modules/expenses/money-spent-current-month/money-spent-current-month.i18n';
import { useIntl } from '@modules/intl';

export type TMoneySpentCurrentMonthProps = {
	currentDate: TISODateString;
};

export function MoneySpentCurrentMonth(props: TMoneySpentCurrentMonthProps) {
	let intl = useIntl(moneySpentI18n);
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
		<MoneyCard
			title={`${intl.translate('title')} ${currentMonth}`}
			amount={total}
			total={appConfig.budget}
		/>
	);
}

function getMonthByIndex(index: TMonth): string {
	let months = {
		0: 'январь',
		1: 'февраль',
		2: 'март',
		3: 'апрель',
		4: 'май',
		5: 'июнь',
		6: 'июль',
		7: 'август',
		8: 'сентябрь',
		9: 'октябрь',
		10: 'ноябрь',
		11: 'декабрь',
	};

	let currentMonth = months[index];

	if (!currentMonth) {
		return '';
	}

	return currentMonth;
}
