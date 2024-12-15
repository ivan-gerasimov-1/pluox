import { useQuery } from '@tanstack/react-query';
import { useStore } from 'zustand';

import { TMonth } from '@root/core/modules/expense/domain/expenseUseCases/totalAmountUseCase/types';

import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';
import { ExpensesByCategory } from '@root/presentation/web-ui/modules/expenses/MoneySpentMonth/components/expensesByCategory/ExpensesByCategory';
import {
	getMonthlyAmount,
	QUERY_EXPENSES_MONTHLY_AMOUNT,
} from '@root/presentation/web-ui/modules/expenses/expenses.query';
import { MoneyCard } from '@root/presentation/web-ui/modules/expenses/moneyCard/moneyCard';
import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';

import { Separator } from '@root/presentation/web-ui/uiKit/separator/separator';

import styles from './moneySpentMonth.module.css';

export type TMoneySpentMonthProps = {
	month: TMonth;
};

export function MoneySpentMonth(props: TMoneySpentMonthProps) {
	let appConfigStore = useService(EServiceToken.APP_CONFIG_STORE);
	let temporal = useService(EServiceToken.TEMPORAL);

	let total = useQuery({
		queryKey: [QUERY_EXPENSES_MONTHLY_AMOUNT, props.month],
		queryFn: () => getMonthlyAmount(props.month),
		refetchOnMount: false,
	});

	let budget = useStore(appConfigStore.get(), (state) => state.budget);

	let currentMonth = temporal.getMonth(props.month);

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
