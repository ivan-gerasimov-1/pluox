import { useQuery } from '@tanstack/react-query';

import type { TMonth } from '@root/core/infrastructure/temporal/types';

import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';
import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';
import {
	getMonthlyAmount,
	QUERY_EXPENSES_MONTHLY_AMOUNT,
} from '@root/presentation/web-ui/modules/expenses/expenses.query';
import {
	QUERY_APP_CONFIG_BUDGET,
	getBudget,
} from '@root/presentation/web-ui/modules/appConfig/appConfig.query';
import { ExpensesByCategory } from '@root/presentation/web-ui/modules/expenses/MoneySpentMonth/components/expensesByCategory/ExpensesByCategory';
import { MoneyCard } from '@root/presentation/web-ui/modules/expenses/moneyCard/moneyCard';
import { Separator } from '@root/presentation/web-ui/uiKit/separator/separator';

import styles from './moneySpentMonth.module.css';

export type TMoneySpentMonthProps = {
	month: TMonth;
};

/**
 * @todo
 * 1. Don’t refetch *budget* on mount
 */
export function MoneySpentMonth(props: TMoneySpentMonthProps) {
	let temporal = useService(EServiceToken.TEMPORAL);

	let total = useQuery({
		queryKey: [QUERY_EXPENSES_MONTHLY_AMOUNT, props.month],
		queryFn: () => getMonthlyAmount(props.month),
		refetchOnMount: false,
	});

	let { data: budget } = useQuery({
		queryKey: [QUERY_APP_CONFIG_BUDGET],
		queryFn: getBudget,
		/** @todo #1 */
		// refetchOnMount: false,
	});

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
