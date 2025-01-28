import { RouterProvider } from 'react-router';

import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { useEffectOnce } from '@root/presentation/web-ui/hooks/useEffectOnce';
import { IRouter } from '@root/presentation/web-ui/router';

import type { IContainer } from '@root/core/infrastructure/serviceContainer/types';
import { ContainerProvider } from '@root/presentation/web-ui/modules/serviceContainer/provider';

import { ModalProvider } from '@root/presentation/web-ui/modules/app/components/modal/modalProvider';
import { ActionSheetProvider } from '@root/presentation/web-ui/modules/app/components/actionSheet/actionSheetProvider';

import '@root/presentation/web-ui/modules/app/components/root/root.css';

type IRootProps = {
	queryClient: QueryClient;
	router: IRouter;
	diContainer: IContainer;

	onRendered?(): void;
};

export function Root(props: IRootProps) {
	useEffectOnce(() => {
		if (!props.onRendered) {
			return;
		}

		props.onRendered();
	});

	return (
		<ContainerProvider container={props.diContainer}>
			<QueryClientProvider client={props.queryClient}>
				{/* <ReactQueryDevtools initialIsOpen={false} /> */}
				<ModalProvider>
					<ActionSheetProvider>
						<RouterProvider router={props.router} />
					</ActionSheetProvider>
				</ModalProvider>
			</QueryClientProvider>
		</ContainerProvider>
	);
}
