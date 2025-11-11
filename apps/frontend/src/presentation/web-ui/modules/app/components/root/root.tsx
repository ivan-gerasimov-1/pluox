import { QueryClientProvider, type QueryClient } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';

import type { IContainer } from '@root/core/infrastructure/serviceContainer/types';

import type { TDevToolsConfig } from '@root/presentation/web-ui/devtoolsConfig';
import { useEffectOnce } from '@root/presentation/web-ui/hooks/useEffectOnce';
import { ContainerProvider } from '@root/presentation/web-ui/modules/serviceContainer/provider';
import { IRouter } from '@root/presentation/web-ui/router';
import { Dialog } from '@root/presentation/web-ui/uiKit/dialog/react/dialog/dialog';
import { DialogClientProvider } from '@root/presentation/web-ui/uiKit/dialog/react/dialogClient/dialogClientProvider';

import '@root/presentation/web-ui/modules/app/components/root/tailwind.css';
import '@root/presentation/web-ui/modules/app/components/root/root.css';

type IRootProps = {
	queryClient: QueryClient;
	router: IRouter;
	diContainer: IContainer;
	devtoolsConfig: TDevToolsConfig;

	onRendered?(): void;
};

export function Root(props: IRootProps) {
	let { ReactQueryDevtools } = props.devtoolsConfig.reactQuery;

	useEffectOnce(() => {
		props.devtoolsConfig.reactScan.scan();

		if (!props.onRendered) {
			return;
		}

		props.onRendered();
	});

	return (
		<ContainerProvider container={props.diContainer}>
			<QueryClientProvider client={props.queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />

				<DialogClientProvider>
					<RouterProvider router={props.router} />

					<Dialog />
				</DialogClientProvider>
			</QueryClientProvider>
		</ContainerProvider>
	);
}
