import { useQueryClient } from '@tanstack/react-query';

import { ECurrency } from '@core/infrastructure/currency/types';
import type { TExpenseCreateDTO } from '@domain/expense/types';
import { createDateViewValue } from '@modules/expenses/addExpense/helpers/createDateViewValue';
import { ExpenseForm } from '@modules/expenses/expenseView/expenseForm';
import {
	QUERY_EXPENSES_LIST,
	QUERY_EXPENSES_MONTHLY_AMOUNT,
	QUERY_EXPENSES_TOTAL_AMOUNT,
} from '@modules/expenses/expenses.query';
import { useExpensesStore } from '@modules/expenses/expenses.store';

export function AddExpense() {
	let queryClient = useQueryClient();
	let addExpenseToStore = useExpensesStore((state) => state.addExpense);

	async function addExpense(payload: TExpenseCreateDTO): Promise<void> {
		await addExpenseToStore(payload);

		await Promise.all([
			queryClient.invalidateQueries({
				queryKey: [QUERY_EXPENSES_TOTAL_AMOUNT],
			}),
			queryClient.invalidateQueries({
				queryKey: [QUERY_EXPENSES_MONTHLY_AMOUNT],
			}),
			queryClient.invalidateQueries({
				queryKey: [QUERY_EXPENSES_LIST],
				/**
				 * @description
				 * For now we could use this approach, alternative is to
				 * refetch a query onMount if it is invalidated
				 * @example
				 *   refetchOnMount({ state }) {
				 *     return state.isInvalidated;
				 *   }
				 */
				refetchType: 'all',
			}),
		]);
	}

	/** @todo Make configurable */
	let defaultCurrency = ECurrency.GEL;

	return (
		<ExpenseForm
			onSubmit={addExpense}
			amount={0}
			currency={defaultCurrency}
			comment=""
			category=""
			date={createDateViewValue()}
		/>
	);
}
