import { AuthService } from '@core/infrastructure/authService/AuthService';
import { EAppPath } from '@root/appPath';
import { Icon } from '@uiKit/icon/icon';
import { Navigable } from '@uiKit/navigable/navigable';

export function Header() {
	let isAuthenticated = AuthService.getInstance().check();

	return (
		<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
			{isAuthenticated ? (
				<Navigable to={EAppPath.SETTINGS}>
					<Icon name={Icon.IconName.User} size={Icon.Size.LARGE} />
				</Navigable>
			) : (
				<Navigable to={EAppPath.LOGIN}>
					<Icon name={Icon.IconName.LogIn} size={Icon.Size.LARGE} />
				</Navigable>
			)}
		</div>
	);
}
