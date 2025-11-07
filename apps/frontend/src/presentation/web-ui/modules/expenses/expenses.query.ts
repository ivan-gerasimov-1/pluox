import {
	type QueryClient,
	useMutation,
	useQuery,
	useQueryClient,
	useSuspenseQuery,
} from '@tanstack/react-query';

import type { Id } from '@domain/types';
import type { TISODateString, TMonth } from '@root/core/domain/temporal/types';
import type {
	TExpenseCreateDTO,
	TExpenseUpdateDTO,
} from '@root/core/modules/expense/application/dto/expenseDTO';

import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';

type TExpenseQueryType =
	| 'list'
	| 'amount:byMonth'
	| 'amount:byDay'
	| 'amount:byCategory';

function createExpenseQuery(): unknown[];
function createExpenseQuery(
	type: 'list',
	options?: {
		dateFrom?: TISODateString;
		dateTo?: TISODateString;
	},
): unknown[];
function createExpenseQuery(
	type: 'amount:byMonth' | 'amount:byCategory',
	options: {
		month: TMonth;
	},
): unknown[];
function createExpenseQuery(type: 'amount:byDay'): unknown[];
function createExpenseQuery(
	type?: TExpenseQueryType,
	options?: {
		month?: TMonth;
		dateFrom?: TISODateString;
		dateTo?: TISODateString;
	},
): unknown[] {
	let queryKey: unknown[] = ['expense'];

	if (!type) {
		return queryKey;
	}

	switch (type) {
		case 'list':
			queryKey.push('list', {
				dateFrom: options?.dateFrom,
				dateTo: options?.dateTo,
			});
			break;
		case 'amount:byMonth':
			queryKey.push('amount:byMonth', {
				month: options?.month?.toString(),
			});
			break;
		case 'amount:byDay':
			queryKey.push('amount:byDay');
			break;
		case 'amount:byCategory':
			queryKey.push('amount:byCategory', {
				month: options?.month?.toString(),
			});
			break;
		default: {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			let unknownType: never = type;
			break;
		}
	}

	return queryKey;
}

export function invalidateExpenseQuery({
	queryClient,
}: {
	queryClient: QueryClient;
}) {
	return queryClient.invalidateQueries({
		queryKey: createExpenseQuery(),
		refetchType: 'all',
	});
}

export function useExpenseAmountByMonthQuery(): number {
	let temporal = useService(EServiceToken.TEMPORAL);
	let expenseService = useService(EServiceToken.EXPENSE_SERVICE);

	let currentMonth = temporal.getCurrentMonth();

	let { data = 0 } = useQuery({
		refetchOnMount: false,
		queryKey: createExpenseQuery('amount:byMonth', {
			month: currentMonth,
		}),
		queryFn: () => {
			return expenseService.getTotalByMonth(currentMonth);
		},
	});

	return data;
}

export function useExpenseAmountByDayQuery(): number {
	let expenseService = useService(EServiceToken.EXPENSE_SERVICE);

	let { data = 0 } = useQuery({
		refetchOnMount: false,
		queryKey: createExpenseQuery('amount:byDay'),
		queryFn: () => {
			return expenseService.getTotalByDay();
		},
	});

	return data;
}

export function useExpenseAmountByCategoryQuery() {
	let temporal = useService(EServiceToken.TEMPORAL);
	let expenseService = useService(EServiceToken.EXPENSE_SERVICE);

	let currentMonth = temporal.getCurrentMonth();

	let { data = [] } = useQuery({
		refetchOnMount: false,
		queryKey: createExpenseQuery('amount:byCategory', {
			month: currentMonth,
		}),
		queryFn: () => {
			return expenseService.getMonthlyTotalByCategory(currentMonth);
		},
	});

	return data;
}

export function useExpenseListQuery(options: {
	dateFrom?: TISODateString;
	dateTo?: TISODateString;
}) {
	let vanueQueryService = useService(EServiceToken.VENUE_QUERY_SERVICE);
	let expenseService = useService(EServiceToken.EXPENSE_SERVICE);
	let expenseRepository = useService(EServiceToken.EXPENSE_REPOSITORY);
	let expenseMapper = useService(EServiceToken.EXPENSE_MAPPER);

	/**
	 * @todo
	 * 1. Experimental usage of useSuspenseQuery
	 */
	return useSuspenseQuery({
		refetchOnMount: false,
		queryKey: createExpenseQuery('list', options),
		/** @todo LV-124 | Use queryKey */
		queryFn: (/* { queryKey } */) => {
			// let [, dateFrom, dateTo] = queryKey;

			let expenses = expenseRepository.findMany(
				options && {
					filter: {
						dateFrom: options.dateFrom,
						dateTo: options.dateTo,
					},
				},
			);

			let expenseList = expenses.items
				.map((expense) => {
					return expenseMapper.toDTO(expense);
				})
				.map((expense) => {
					if (expense.venue) {
						let venue = vanueQueryService.getById(expense.venue);

						expense.venue = venue?.name ?? null;
					}

					return expense;
				});

			return expenseService.groupExpenseByDate(expenseList);
		},
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
			await invalidateExpenseQuery({
				queryClient,
			});
		},
	});
}

export function useExpenseUpdateMutation() {
	let queryClient = useQueryClient();
	// let expenseUseCase = useService(EServiceToken.EXPENSE_USE_CASE);

	return useMutation({
		mutationFn: async (payload: TExpenseUpdateDTO) => {
			console.log(payload);
			// expenseUseCase.update(payload);
		},
		onSuccess: async () => {
			await invalidateExpenseQuery({
				queryClient,
			});
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
			await invalidateExpenseQuery({
				queryClient,
			});
		},
	});
}
