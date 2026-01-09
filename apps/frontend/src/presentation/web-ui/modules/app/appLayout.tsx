import { Outlet } from 'react-router';

import { useRouteMeta } from '@root/presentation/web-ui/hooks/useScreenMeta/useScreenMeta';
import { AppNavbar } from '@root/presentation/web-ui/modules/app/components/appNavbar/appNavbar';
import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';

export function AppLayout() {
	let meta = useRouteMeta();

	return (
		<Screen className="mb-(--navbar-height)">
			<Outlet />

			{meta.hasNavbar && <AppNavbar hasMainAction={meta.hasNavbarActions} />}
		</Screen>
	);
}
