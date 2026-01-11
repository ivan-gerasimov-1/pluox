import { EAppPath } from '@root/presentation/web-ui/appPath';
import { EIconName } from '@root/presentation/web-ui/uiKit/icon/icons';
import { EIconSize } from '@root/presentation/web-ui/uiKit/icon/iconSize';
import { IconLink } from '@root/presentation/web-ui/uiKit/iconLink/iconLink';
import { Navbar } from '@root/presentation/web-ui/uiKit/navbar/navbar';
import { cls } from '@root/presentation/web-ui/utils/classnames';

type TAppNavbarProps = {
	id?: string;
	Actions?: React.ComponentType;
};

export function AppNavbar({ id, Actions }: TAppNavbarProps) {
	return (
		<Navbar id={id}>
			{Actions && <Actions />}

			<div
				className={cls(
					'flex justify-between',
					'*:p-5 *:text-neutral-600 *:[.active]:text-neutral-900 *:transition-colors',
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
