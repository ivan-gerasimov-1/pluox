import { Outlet } from 'react-router';

import { useRouteMeta } from '@root/presentation/web-ui/hooks/useScreenMeta/useScreenMeta';
import { Navbar } from '@root/presentation/web-ui/modules/app/components/navbar/navbar';
import { Header } from '@root/presentation/web-ui/uiKit/header/header';
import {
	Screen,
	ScreenBody,
} from '@root/presentation/web-ui/uiKit/screen/screen';

export function ScreenLayout() {
	let meta = useRouteMeta();

	let CustomHeader = meta?.TitleComponent as React.ComponentType;

	if (!meta.title && !meta.TitleComponent) {
		throw new Error('Screen must define either title or TitleComponent');
	}

	return (
		<Screen>
			{CustomHeader ? (
				<CustomHeader />
			) : (
				<Header title={meta.title ?? { 'en-US': '', 'ru-RU': '' }} />
			)}
			<ScreenBody>
				<Outlet />
			</ScreenBody>

			{meta.hasNavbar && <Navbar hasMainAction={meta.hasNavbarActions} />}
		</Screen>
	);
}
