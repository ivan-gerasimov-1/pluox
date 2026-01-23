import { getGlobalContainer } from '@pluox/core/src/infrastructure/serviceContainer/containerFactory';
import type { IServiceMap } from '@pluox/core/src/infrastructure/serviceContainer/types';

export function resolveService<T extends keyof IServiceMap = keyof IServiceMap>(
	serviceId: T,
): IServiceMap[T] {
	const service = getGlobalContainer().get(serviceId);

	return service;
}
