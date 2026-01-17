import { AppLink } from '@/presentation/web-ui/uiKit/appLink/appLink';
import { Icon } from '@/presentation/web-ui/uiKit/icon/icon';
import type { TIconName } from '@/presentation/web-ui/uiKit/icon/icons';
import {
	EIconSize,
	type TIconSize,
} from '@/presentation/web-ui/uiKit/icon/iconSize';
import { cn } from '@/presentation/web-ui/utils/classnames';

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
			className={cn(
				'm-0 p-3 flex items-center justify-center',
				props.className,
			)}
		>
			<Icon name={props.iconName} size={props.iconSize || EIconSize.MEDIUM} />
		</AppLink>
	);
}
