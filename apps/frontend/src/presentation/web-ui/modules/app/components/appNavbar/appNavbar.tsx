import { NavLink as RouterLink } from 'react-router';

import { EAppPath } from '@/presentation/web-ui/appPath';
import { Icon } from '@/presentation/web-ui/uiKit/icon/icon';
import { EIconName } from '@/presentation/web-ui/uiKit/icon/icons';
import { EIconSize } from '@/presentation/web-ui/uiKit/icon/iconSize';
import { Stack } from '@/presentation/web-ui/uiKit/layout/layout';
import { Navbar } from '@/presentation/web-ui/uiKit/navbar/navbar';
import { cn } from '@/presentation/web-ui/utils/classnames';

type TAppNavbarProps = {
	id?: string;
	Actions?: React.ComponentType;
};

export function AppNavbar({ id, Actions }: TAppNavbarProps) {
	return (
		<Navbar id={id}>
			{Actions && <Actions />}

			<Stack
				className={cn([
					'*:flex',
					'*:p-5',
					'*:text-gray-500 *:[.active]:text-gray-800',
					'*:transition-colors',
				])}
				row
				between
			>
				<RouterLink className="-ml-2.5" to={EAppPath.DASHBOARD}>
					<Icon name={EIconName.Circle} size={EIconSize.LARGE} />
				</RouterLink>

				<RouterLink to={EAppPath.EXPENSES}>
					<Icon name={EIconName.Infinite} size={EIconSize.LARGE} />
				</RouterLink>

				<RouterLink className="-mr-2.5" to={EAppPath.SETTINGS}>
					<Icon name={EIconName.Triangle} size={EIconSize.LARGE} />
				</RouterLink>
			</Stack>
		</Navbar>
	);
}
