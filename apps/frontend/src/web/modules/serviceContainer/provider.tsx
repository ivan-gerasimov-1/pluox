import type { IContainer } from '@core/infrastructure/serviceContainer/types';
import { createContext } from 'react';

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
