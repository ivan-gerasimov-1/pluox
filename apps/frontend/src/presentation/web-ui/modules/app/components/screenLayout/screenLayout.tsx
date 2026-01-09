import { Outlet } from 'react-router';

import { useRouteMeta } from '@root/presentation/web-ui/hooks/useScreenMeta/useScreenMeta';
import { Navbar } from '@root/presentation/web-ui/modules/app/components/navbar/navbar';
import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';

export function ScreenLayout() {
	let meta = useRouteMeta();

	return (
		<Screen>
			<Outlet />

			{meta.hasNavbar && <Navbar hasMainAction={meta.hasNavbarActions} />}
		</Screen>
	);
}
