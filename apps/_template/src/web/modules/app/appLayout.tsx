import { Outlet } from 'react-router';

import { useRouteMeta } from '@/web/hooks/useRouteMeta/useRouteMeta';

import { AppNavbar } from '@/web/modules/app/components/appNavbar/appNavbar';

import { View } from '@kit/view/view';

export function AppLayout() {
	let { Actions } = useRouteMeta();

	return (
		<>
			<View id="appScreen" className="mb-(--navbar-height)">
				<Outlet />
			</View>

			<AppNavbar id="appNavbar" Actions={Actions} />
		</>
	);
}
