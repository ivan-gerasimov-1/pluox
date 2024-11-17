import { StrictMode } from 'react';
import {
	createBrowserRouter as createRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { EAppPath } from '@root/appPath';
import { useEffectOnce } from '@root/hooks/useEffectOnce';

import { MainScreen } from '@screens/main/main';
import { ExpenseListScreen } from '@screens/expenseList';
import { ExpenseListMonthlyScreen } from '@screens/expenseListMonthly';
import { SignIn } from '@screens/signIn/SignIn';
import { Settings } from '@screens/settings/settings';
import { SignUp } from '@screens/signUp/SignUp';
import { NotFoundErrorScreen } from '@screens/error/screens/notFoundErrorScreen/notFoundErrorScreen';

import '@root/root.css';

type IAppProps = {
	queryClient: QueryClient;

	onRendered?(): void;
};

export function App(props: IAppProps) {
	useEffectOnce(() => {
		if (!props.onRendered) {
			return;
		}

		props.onRendered();
	});

	let router = createRouter(
		createRoutesFromElements(
			<>
				<Route path={EAppPath.SIGNUP} element={<SignUp />} />
				<Route path={EAppPath.SIGNIN} element={<SignIn />} />

				<Route path={EAppPath.MAIN} element={<MainScreen />} />
				<Route path={EAppPath.EXPENSES} element={<ExpenseListScreen />} />
				<Route
					path={EAppPath.EXPENSES_LIST_MONTHLY}
					element={<ExpenseListMonthlyScreen />}
				/>

				<Route path={EAppPath.SETTINGS} element={<Settings />} />

				<Route path="*" element={<NotFoundErrorScreen />} />
			</>,
		),
	);

	return (
		<StrictMode>
			<QueryClientProvider client={props.queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</StrictMode>
	);
}
