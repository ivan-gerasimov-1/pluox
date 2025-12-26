import { AppLink } from '@root/presentation/web-ui/uiKit/appLink/appLink';
import { Icon } from '@root/presentation/web-ui/uiKit/icon/icon';
import type { TIconName } from '@root/presentation/web-ui/uiKit/icon/icons';
import {
	EIconSize,
	type TIconSize,
} from '@root/presentation/web-ui/uiKit/icon/iconSize';
import { cls } from '@root/presentation/web-ui/utils/classnames';

type TIconLinkProps = {
	className?: string;

	to: string;

	iconName: TIconName;
	iconSize?: TIconSize;
};

export function IconLink(props: TIconLinkProps) {
	return (
		<AppLink
			to={props.to}
			className={cls(
				'm-0 p-3 flex items-center justify-center',
				props.className,
			)}
		>
			<Icon name={props.iconName} size={props.iconSize || EIconSize.MEDIUM} />
		</AppLink>
	);
}
