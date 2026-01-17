import { EAppPath } from '@/presentation/web-ui/appPath';
import { EIconName } from '@/presentation/web-ui/uiKit/icon/icons';
import { EIconSize } from '@/presentation/web-ui/uiKit/icon/iconSize';
import { IconLink } from '@/presentation/web-ui/uiKit/iconLink/iconLink';
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

			<div
				className={cn(
					'flex justify-between',
					'*:p-5 *:text-gray-500 *:[.active]:text-gray-800 *:transition-colors',
				)}
			>
				<IconLink
					className="-ml-2.5"
					to={EAppPath.DASHBOARD}
					iconName={EIconName.Circle}
					iconSize={EIconSize.LARGE}
				/>

				<IconLink
					to={EAppPath.EXPENSES}
					iconName={EIconName.Infinite}
					iconSize={EIconSize.LARGE}
				/>

				<IconLink
					className="-mr-2.5"
					to={EAppPath.SETTINGS}
					iconName={EIconName.Triangle}
					iconSize={EIconSize.LARGE}
				/>
			</div>
		</Navbar>
	);
}
