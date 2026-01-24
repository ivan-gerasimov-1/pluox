import { Outlet } from 'react-router';

import { Screen } from '@kit/screen/screen';

export function AuthenticationLayout() {
	return (
		<Screen className="h-screen items-center justify-center">
			<Outlet />
		</Screen>
	);
}
