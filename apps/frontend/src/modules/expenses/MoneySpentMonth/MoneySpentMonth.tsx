import { useQuery } from '@tanstack/react-query';
import { useStore } from 'zustand';

import { TMonth } from '@domain/amount/useCases/types';

import { useService } from '@modules/serviceContainer/useService';
import { useMonthName } from '@modules/common/hooks/useMonthName/useMonthName';
import { ExpensesByCategory } from '@modules/expenses/MoneySpentMonth/components/expensesByCategory/ExpensesByCategory';
import {
	getMonthlyAmount,
	QUERY_EXPENSES_MONTHLY_AMOUNT,
} from '@modules/expenses/expenses.query';
import { MoneyCard } from '@modules/expenses/moneyCard/moneyCard';
import { EServiceToken } from '@modules/serviceContainer/types';

import { Separator } from '@uiKit/separator/separator';

import styles from './moneySpentMonth.module.css';

export type TMoneySpentMonthProps = {
	month: TMonth;
};

export function MoneySpentMonth(props: TMoneySpentMonthProps) {
	let appConfigStore = useService(EServiceToken.APP_CONFIG_STORE);

	let total = useQuery({
		queryKey: [QUERY_EXPENSES_MONTHLY_AMOUNT, props.month],
		queryFn: () => getMonthlyAmount(props.month),
		refetchOnMount: false,
	});

	let budget = useStore(appConfigStore.get(), (state) => state.budget);

	let currentMonth = useMonthName(props.month);

	return (
		<>
			<MoneyCard title={currentMonth} amount={total.data} total={budget} />

			<Separator />

			<ExpensesByCategory
				className={styles.expensesByCategory}
				month={props.month}
			/>
		</>
	);
}
