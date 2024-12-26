import { resolveService } from '@root/core/infrastructure/serviceContainer/resolveService';
import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';

export const QUERY_APP_CONFIG_BUDGET = Symbol('appConfigBudget');

export function getBudget(): number {
	let appConfig = resolveService(EServiceToken.APP_CONFIG);

	return appConfig.budget ?? 0;
}
