import { useContext } from 'react';

import { IServiceMap } from '@root/core/infrastructure/serviceContainer/types';
import { ContainerContext } from '@root/core/infrastructure/serviceContainer/react/provider';

export function useService<T extends keyof IServiceMap = keyof IServiceMap>(
	serviceId: T,
): IServiceMap[T] {
	const container = useContext(ContainerContext);

	if (!container) {
		throw new Error('useService must be used within ContainerProvider');
	}

	return container.get(serviceId);
}
