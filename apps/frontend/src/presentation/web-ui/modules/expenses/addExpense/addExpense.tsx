import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ECurrency } from '@root/core/modules/currency/domain/types';
import { createDateViewValue } from '@root/presentation/web-ui/modules/expenses/addExpense/helpers/createDateViewValue';
import { ExpenseForm } from '@root/presentation/web-ui/modules/expenses/expenseView/expenseForm';
import {
	addOne,
	QUERY_EXPENSES_DAILY_AMOUNT,
	QUERY_EXPENSES_LIST,
	QUERY_EXPENSES_MONTHLY_AMOUNT,
	QUERY_EXPENSES_TOTAL_AMOUNT,
} from '@root/presentation/web-ui/modules/expenses/expenses.query';
import type { TExpenseCreateDTO } from '@root/core/modules/expense/application/dto/expenseDTO';

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
				queryClient.invalidateQueries({
					queryKey: [QUERY_EXPENSES_DAILY_AMOUNT],
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
			description=""
			category=""
			date={createDateViewValue()}
		/>
	);
}
