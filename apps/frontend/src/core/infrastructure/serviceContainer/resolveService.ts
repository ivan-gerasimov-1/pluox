import { getGlobalContainer } from '@root/diContainer';

import { IServiceMap } from '@root/core/infrastructure/serviceContainer/types';

export type { IServiceMap };

export function resolveService<T extends keyof IServiceMap = keyof IServiceMap>(
	serviceId: T,
): IServiceMap[T] {
	const service = getGlobalContainer().get(
		serviceId,
	) as unknown as IServiceMap[T];

	return service;
}
