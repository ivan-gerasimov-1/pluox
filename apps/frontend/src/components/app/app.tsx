import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { IRouter } from '@root/router';
import { useEffectOnce } from '@root/hooks/useEffectOnce';

import '@root/root.css';

type IAppProps = {
	queryClient: QueryClient;
	router: IRouter;

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
			<QueryClientProvider client={props.queryClient}>
				<RouterProvider router={props.router} />
			</QueryClientProvider>
		</StrictMode>
	);
}
