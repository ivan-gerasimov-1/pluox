import { TMonth } from '@domain/amount/useCases/types';
import { useAppConfig } from '@modules/appConfig/useAppConfig';
import { useExpensesStore } from '@modules/expenses';
import { useMonthName } from '@modules/common/hooks/useMonthName/useMonthName';
import { MoneyCard } from '@modules/expenses/moneyCard/moneyCard';

export type TMoneySpentMonthProps = {
	month: TMonth;
};

export function MoneySpentMonth(props: TMoneySpentMonthProps) {
	let appConfig = useAppConfig();
	let total = useExpensesStore((state) => state.getMonthlyAmount(props.month));
	let currentMonth = useMonthName(props.month);

	return (
		<MoneyCard title={currentMonth} amount={total} total={appConfig.budget} />
	);
}
