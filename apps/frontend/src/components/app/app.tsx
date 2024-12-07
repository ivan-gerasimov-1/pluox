import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { IRouter } from '@root/router';
import { useEffectOnce } from '@root/hooks/useEffectOnce';

import type { IContainer } from '@modules/serviceContainer/types';
import { ContainerProvider } from '@modules/serviceContainer/react/provider';

import '@root/root.css';

type IAppProps = {
	queryClient: QueryClient;
	router: IRouter;
	diContainer: IContainer;

	onRendered?(): void;
};

export function App(props: IAppProps) {
	useEffectOnce(() => {
		if (!props.onRendered) {
			return;
		}

		props.onRendered();
	});

	return (
		<StrictMode>
			<ContainerProvider container={props.diContainer}>
				<QueryClientProvider client={props.queryClient}>
					<RouterProvider
						router={props.router}
						future={{
							v7_startTransition: true,
						}}
					/>
				</QueryClientProvider>
			</ContainerProvider>
		</StrictMode>
	);
}
