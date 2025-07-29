import {
	useMutation,
	useQuery,
	useQueryClient,
	useSuspenseQuery,
} from '@tanstack/react-query';

import type { Id } from '@domain/types';
import type { TISODateString, TMonth } from '@root/core/domain/temporal/types';
import type {
	TExpenseCreateDTO,
	TExpenseDTO,
} from '@root/core/modules/expense/application/dto/expenseDTO';

import { resolveService } from '@root/core/infrastructure/serviceContainer/resolveService';

import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';

export const EXPENSES_QUERY_LIST = 'expenseQueryList';
export const EXPENSES_QUERY_TOTAL_AMOUNT = 'expenseQueryTotalAmount';
export const EXPENSES_QUERY_MONTHLY_AMOUNT = 'expenseQueryMonthlyAmount';
export const EXPENSES_QUERY_DAILY_AMOUNT = 'expenseQueryDailyAmount';
export const EXPENSES_QUERY_MONTHLY_TOTAL_BY_CATEGORY =
	'expenseQueryMonthlyTotalByCategory';

export function getList(query?: {
	dateFrom?: TISODateString;
	dateTo?: TISODateString;
}): TExpenseDTO[] {
	let expenseRepository = resolveService(EServiceToken.EXPENSE_REPOSITORY);
	let expenseMapper = resolveService(EServiceToken.EXPENSE_MAPPER);

	let expenses = expenseRepository.findMany(
		query && {
			filter: {
				dateFrom: query?.dateFrom,
				dateTo: query?.dateTo,
			},
		},
	);

	return expenses.items.map((expense) => {
		return expenseMapper.toDTO(expense);
	});
}

export function getTotalAmount(): number {
	let expenseService = resolveService(EServiceToken.EXPENSE_SERVICE);

	return expenseService.getTotalByYear();
}

export function getMonthlyAmount(month: TMonth): number {
	let expenseService = resolveService(EServiceToken.EXPENSE_SERVICE);

	return expenseService.getTotalByMonth(month);
}

export function getDailyAmount(): number {
	let expenseService = resolveService(EServiceToken.EXPENSE_SERVICE);

	return expenseService.getTotalByDay();
}

export function useMonthlyAmount(): number {
	let temporal = useService(EServiceToken.TEMPORAL);

	let currentMonth = temporal.getCurrentMonth();

	let { data = 0 } = useQuery({
		queryKey: [EXPENSES_QUERY_MONTHLY_AMOUNT, currentMonth],
		queryFn: () => getMonthlyAmount(currentMonth),
		refetchOnMount: false,
	});

	return data;
}

export function useDailyAmount(): number {
	let { data = 0 } = useQuery({
		queryKey: [EXPENSES_QUERY_DAILY_AMOUNT],
		queryFn: getDailyAmount,
		refetchOnMount: false,
	});

	return data;
}

export function useMonthlyTotalByCategory() {
	let temporal = useService(EServiceToken.TEMPORAL);
	let expenseService = useService(EServiceToken.EXPENSE_SERVICE);

	let currentMonth = temporal.getCurrentMonth();

	let { data = [] } = useQuery({
		queryKey: [EXPENSES_QUERY_MONTHLY_TOTAL_BY_CATEGORY, currentMonth],
		queryFn: () => {
			return expenseService.getMonthlyTotalByCategory(currentMonth);
		},
		refetchOnMount: false,
	});

	return data;
}

export function useExpenseListQuery(options: {
	dateFrom?: TISODateString;
	dateTo?: TISODateString;
}) {
	let vanueQueryService = useService(EServiceToken.VENUE_QUERY_SERVICE);
	let expenseService = useService(EServiceToken.EXPENSE_SERVICE);

	/**
	 * @todo
	 * 1. Experimental usage of useSuspenseQuery
	 */
	return useSuspenseQuery({
		queryKey: [EXPENSES_QUERY_LIST, options.dateFrom, options.dateTo],
		queryFn: ({ queryKey }) => {
			let [, dateFrom, dateTo] = queryKey;

			let expenseList = getList({
				dateFrom,
				dateTo,
			}).map((expense) => {
				if (expense.venue) {
					let venue = vanueQueryService.getById(expense.venue);

					expense.venue = venue?.name ?? null;
				}

				return expense;
			});

			return expenseService.groupExpenseByDate(expenseList);
		},
		// placeholderData: [],
		refetchOnMount: false,
	});
}

export function useExpenseCreateMutation() {
	let queryClient = useQueryClient();
	let expenseUseCase = useService(EServiceToken.EXPENSE_USE_CASE);

	return useMutation({
		mutationFn: async (payload: TExpenseCreateDTO) => {
			expenseUseCase.create(payload);
		},
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
				queryClient.invalidateQueries({
					queryKey: [EXPENSES_QUERY_MONTHLY_TOTAL_BY_CATEGORY],
					refetchType: 'all',
				}),
			]);
		},
	});
}

export function useExpenseDeleteMutation() {
	let queryClient = useQueryClient();
	let expenseUseCase = useService(EServiceToken.EXPENSE_USE_CASE);

	return useMutation({
		mutationFn: async (id: Id) => {
			expenseUseCase.delete(id);
		},
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
			]);
		},
	});
}
