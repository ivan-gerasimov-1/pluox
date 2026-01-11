import { getGlobalContainer } from '@/core/infrastructure/serviceContainer/containerFactory';
import type { IServiceMap } from '@/core/infrastructure/serviceContainer/types';

export function resolveService<T extends keyof IServiceMap = keyof IServiceMap>(
	serviceId: T,
): IServiceMap[T] {
	const service = getGlobalContainer().get(serviceId);

	return service;
}
