import { IServiceMap } from '@/core/infrastructure/serviceContainer/types';
import { ContainerContext } from '@/presentation/web-ui/modules/serviceContainer/provider';
import { useContext } from 'react';

export function useService<T extends keyof IServiceMap = keyof IServiceMap>(
	serviceId: T,
): IServiceMap[T] {
	const container = useContext(ContainerContext);

	if (!container) {
		throw new Error('useService must be used within ContainerProvider');
	}

	return container.get(serviceId);
}
