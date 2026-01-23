import { Outlet } from 'react-router';

import { useRouteMeta } from '@/presentation/web/hooks/useScreenMeta/useScreenMeta';
import { AppNavbar } from '@/presentation/web/modules/app/components/appNavbar/appNavbar';
import { Screen } from '@/presentation/web/uiKit/screen/screen';

export function AppLayout() {
	let { Actions } = useRouteMeta();

	return (
		<>
			<Screen id="appScreen" className="mb-(--navbar-height)">
				<Outlet />
			</Screen>

			<AppNavbar id="appNavbar" Actions={Actions} />
		</>
	);
}
