import { createContext } from 'react';

import type { IContainer } from '@/core/infrastructure/serviceContainer/types';

export let ContainerContext = createContext<IContainer | null>(null);

export function ContainerProvider(
	props: React.PropsWithChildren<{
		container: IContainer;
	}>,
) {
	return (
		<ContainerContext.Provider value={props.container}>
			{props.children}
		</ContainerContext.Provider>
	);
}
