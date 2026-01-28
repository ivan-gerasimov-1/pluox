import { QueryClientProvider, type QueryClient } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';

import type { TDevToolsConfig } from '@/web/devtoolsConfig';
import { IRouter } from '@/web/router';

import { useEffectOnce } from '@/web/hooks/useEffectOnce';

import { Dialog } from '@kit/dialog/react/dialog/dialog';
import { DialogClientProvider } from '@kit/dialog/react/dialogClient/dialogClientProvider';

import '@/web/modules/app/components/app/app.css';
import '@/web/modules/app/components/app/tailwind.css';

type IAppProps = {
	queryClient: QueryClient;
	router: IRouter;
	devtoolsConfig: TDevToolsConfig;

	onRendered?(): void;
};

export function App(props: IAppProps) {
	let { ReactQueryDevtools } = props.devtoolsConfig.reactQuery;

	useEffectOnce(() => {
		props.devtoolsConfig.reactScan.scan();

		if (!props.onRendered) {
			return;
		}

		props.onRendered();
	});

	return (
		<QueryClientProvider client={props.queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />

			<DialogClientProvider>
				<RouterProvider router={props.router} />

				<Dialog />
			</DialogClientProvider>
		</QueryClientProvider>
	);
}
