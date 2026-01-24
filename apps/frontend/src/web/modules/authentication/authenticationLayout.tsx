import { Outlet } from 'react-router';

import { View } from '@kit/view/view';

export function AuthenticationLayout() {
	return (
		<View className="h-screen items-center justify-center">
			<Outlet />
		</View>
	);
}
