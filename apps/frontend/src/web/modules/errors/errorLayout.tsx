import { Outlet } from 'react-router';

import { Screen } from '@kit/screen/screen';

export function ErrorLayout() {
	return (
		<Screen className="h-screen items-center justify-center">
			<Outlet />
		</Screen>
	);
}
