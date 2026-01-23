import { resolveService } from '@pluox/core/src/infrastructure/serviceContainer/resolveService';
import { ECurrency } from '@pluox/core/src/modules/currency/domain/types';
import { ELocaleCode } from '@pluox/core/src/modules/intl/domain/enums';
import type { TAppConfig } from '@pluox/core/src/modules/settings/domain/appConfig/types';
import {
	useMutation,
	useQuery,
	useQueryClient,
	type QueryClient,
} from '@tanstack/react-query';

import { invalidateExpenseQuery } from '@/web/modules/expenses/expenses.query';
import { EServiceToken } from '@/web/modules/serviceContainer/enums';

function createAppConfigQuery() {
	return ['appConfig'];
}

async function invalidateAppConfigQuery({
	queryClient,
}: {
	queryClient: QueryClient;
}) {
	let result = await queryClient.invalidateQueries({
		queryKey: createAppConfigQuery(),
	});

	invalidateExpenseQuery({
		queryClient,
	});

	return result;
}

export function useAppConfigQuery() {
	let appConfig = resolveService(EServiceToken.APP_CONFIG);

	let {
		data = {
			locale: ELocaleCode.EN_US,
			budget: null,
			currency: ECurrency.USD,
			availabelCurrencies: [ECurrency.USD, ECurrency.EUR],
		},
	} = useQuery({
		// eslint-disable-next-line @tanstack/query/exhaustive-deps
		queryKey: createAppConfigQuery(),
		queryFn: () => {
			return {
				locale: appConfig.locale,
				budget: appConfig.budget,
				currency: appConfig.currency,
				availabelCurrencies: appConfig.availableCurrencies,
			};
		},
		// refetchOnMount: false,
	});

	return data;
}

export function useAppConfigBudgetQuery() {
	let appConfig = useAppConfigQuery();

	return appConfig.budget ?? 0;
}

export function useAppConfigUpdateMutation() {
	let queryClient = useQueryClient();

	let appConfigService = resolveService(EServiceToken.APP_CONFIG_SERVICE);

	return useMutation({
		mutationFn: async (payload: Partial<TAppConfig>) => {
			return appConfigService.update({
				locale: payload.locale,
				budget: payload.budget,
				currency: payload.currency,
			});
		},
		onSuccess: async () => {
			await invalidateAppConfigQuery({
				queryClient,
			});
		},
	});
}
