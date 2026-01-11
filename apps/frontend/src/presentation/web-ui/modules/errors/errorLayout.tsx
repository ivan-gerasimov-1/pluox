import { Screen } from '@/presentation/web-ui/uiKit/screen/screen';
import { Outlet } from 'react-router';

export function ErrorLayout() {
	return (
		<Screen className="h-screen items-center justify-center">
			<Outlet />
		</Screen>
	);
}
