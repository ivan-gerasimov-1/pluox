import { Outlet } from 'react-router';

import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';

export function AuthenticationLayout() {
	return (
		<Screen className="h-screen items-center justify-center">
			<Outlet />
		</Screen>
	);
}
