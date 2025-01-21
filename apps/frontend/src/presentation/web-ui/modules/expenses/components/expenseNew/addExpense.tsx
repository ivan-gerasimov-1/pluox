import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ECurrency } from '@root/core/modules/currency/domain/types';
import { createDateViewValue } from '@root/presentation/web-ui/modules/expenses/components/expenseNew/helpers/createDateViewValue';
import { ExpenseForm } from '@root/presentation/web-ui/modules/expenses/components/expenseForm/expenseForm';
import {
	addOne,
	EXPENSES_QUERY_DAILY_AMOUNT,
	EXPENSES_QUERY_LIST,
	EXPENSES_QUERY_MONTHLY_AMOUNT,
	EXPENSES_QUERY_TOTAL_AMOUNT,
} from '@root/presentation/web-ui/modules/expenses/expenses.query';
import type { TExpenseCreateDTO } from '@root/core/modules/expense/application/dto/expenseDTO';

export function ExpenseNew() {
	let queryClient = useQueryClient();

	let addExpense = useMutation({
		mutationFn: async (payload: TExpenseCreateDTO) => addOne(payload),
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: [EXPENSES_QUERY_TOTAL_AMOUNT],
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
					queryKey: [EXPENSES_QUERY_MONTHLY_AMOUNT],
					refetchType: 'all',
				}),
				queryClient.invalidateQueries({
					queryKey: [EXPENSES_QUERY_LIST],
					refetchType: 'all',
				}),
				queryClient.invalidateQueries({
					queryKey: [EXPENSES_QUERY_DAILY_AMOUNT],
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
			venue=""
			date={createDateViewValue()}
		/>
	);
}
