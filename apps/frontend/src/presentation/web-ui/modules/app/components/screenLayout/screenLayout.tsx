import { Outlet } from 'react-router';

import { useScreenMeta } from './useScreenMeta';

import { Header } from '@root/presentation/web-ui/uiKit/header/header';
import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';
import { ScreenBody } from '@root/presentation/web-ui/uiKit/screen/screenBody';

export function ScreenLayout() {
	let meta = useScreenMeta();

	let CustomHeader = meta?.TitleComponent as React.ComponentType;

	if (!meta.title && !meta.TitleComponent) {
		throw new Error('Screen must define either title or TitleComponent');
	}

	return (
		<Screen hasNavbar={meta?.hasNavbar ?? false}>
			{CustomHeader ? <CustomHeader /> : <Header title={meta.title ?? ''} />}
			<ScreenBody>
				<Outlet />
			</ScreenBody>
		</Screen>
	);
}
