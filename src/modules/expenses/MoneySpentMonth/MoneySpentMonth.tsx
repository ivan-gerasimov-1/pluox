import { TMonth } from '@domain/amount/useCases/types';
import { useMonthName } from '@modules/common/hooks/useMonthName/useMonthName';
import { useExpensesStore } from '@modules/expenses';
import { ExpensesByCategory } from '@modules/expenses/MoneySpentMonth/components/expensesByCategory/ExpensesByCategory';
import { MoneyCard } from '@modules/expenses/moneyCard/moneyCard';
import { EService, useService } from '@modules/serviceContainer/useService';
import styles from './moneySpentMonth.module.css';

export type TMoneySpentMonthProps = {
	month: TMonth;
};

export function MoneySpentMonth(props: TMoneySpentMonthProps) {
	let appConfig = useService(EService.APP_CONFIG);
	let total = useExpensesStore((state) => state.getMonthlyAmount(props.month));
	let currentMonth = useMonthName(props.month);

	return (
		<>
			<MoneyCard title={currentMonth} amount={total} total={appConfig.budget} />

			<hr className={styles.separator} />

			<ExpensesByCategory />
		</>
	);
}
