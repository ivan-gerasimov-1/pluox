import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ECurrency } from '@core/infrastructure/currency/types';
import { createDateViewValue } from '@root/presentation/web-ui/modules/expenses/addExpense/helpers/createDateViewValue';
import { ExpenseForm } from '@root/presentation/web-ui/modules/expenses/expenseView/expenseForm';
import {
	addOne,
	QUERY_EXPENSES_LIST,
	QUERY_EXPENSES_MONTHLY_AMOUNT,
	QUERY_EXPENSES_TOTAL_AMOUNT,
} from '@root/presentation/web-ui/modules/expenses/expenses.query';
import type { TExpenseCreateDTO } from '@domain/expense/types';

export function AddExpense() {
	let queryClient = useQueryClient();

	let addExpense = useMutation({
		mutationFn: async (payload: TExpenseCreateDTO) => addOne(payload),
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: [QUERY_EXPENSES_TOTAL_AMOUNT],
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
				queryClient.invalidateQueries({
					queryKey: [QUERY_EXPENSES_MONTHLY_AMOUNT],
					refetchType: 'all',
				}),
				queryClient.invalidateQueries({
					queryKey: [QUERY_EXPENSES_LIST],
					refetchType: 'all',
				}),
			]);
		},
	});

	/** @todo Make configurable */
	let defaultCurrency = ECurrency.GEL;

	return (
		<ExpenseForm
			onSubmit={addExpense.mutate}
			amount={0}
			currency={defaultCurrency}
			comment=""
			category=""
			date={createDateViewValue()}
		/>
	);
}
