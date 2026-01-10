import { Outlet } from 'react-router';

import { useRouteMeta } from '@root/presentation/web-ui/hooks/useScreenMeta/useScreenMeta';
import { AppNavbar } from '@root/presentation/web-ui/modules/app/components/appNavbar/appNavbar';
import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';

export function AppLayout() {
	let { Actions } = useRouteMeta();

	return (
		<Screen className="mb-(--navbar-height)">
			<Outlet />

			<AppNavbar Actions={Actions} />
		</Screen>
	);
}
