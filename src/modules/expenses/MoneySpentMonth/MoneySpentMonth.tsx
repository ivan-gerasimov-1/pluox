import { useStore } from 'zustand';

import { TMonth } from '@domain/amount/useCases/types';

import { AppConfigStore } from '@modules/appConfig/appConfig.store';
import { useMonthName } from '@modules/common/hooks/useMonthName/useMonthName';
import { useExpensesStore } from '@modules/expenses';
import { ExpensesByCategory } from '@modules/expenses/MoneySpentMonth/components/expensesByCategory/ExpensesByCategory';
import { MoneyCard } from '@modules/expenses/moneyCard/moneyCard';

import { Separator } from '@uiKit/separator/separator';

export type TMoneySpentMonthProps = {
	month: TMonth;
};

export function MoneySpentMonth(props: TMoneySpentMonthProps) {
	let total = useExpensesStore((state) => state.getMonthlyAmount(props.month));
	let budget = useStore(
		AppConfigStore.getInstance().get(),
		(state) => state.budget,
	);

	let currentMonth = useMonthName(props.month);

	return (
		<>
			<MoneyCard title={currentMonth} amount={total} total={budget} />

			<Separator />

			<ExpensesByCategory month={props.month} />
		</>
	);
}
