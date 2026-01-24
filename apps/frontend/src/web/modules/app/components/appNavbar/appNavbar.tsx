import { NavLink as RouterLink } from 'react-router';

import { EAppPath } from '@/web/appPath';

import { cn } from '@/web/utils/classnames';

import { Icon } from '@/web/uiKit/icon/icon';
import { EIconName } from '@/web/uiKit/icon/icons';
import { EIconSize } from '@/web/uiKit/icon/iconSize';
import { Stack } from '@/web/uiKit/layout/layout';
import { Navbar } from '@/web/uiKit/navbar/navbar';

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
