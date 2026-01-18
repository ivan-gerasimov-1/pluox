import { Icon } from '@/presentation/web-ui/uiKit/icon/icon';
import type { TIconName } from '@/presentation/web-ui/uiKit/icon/icons';
import {
	EIconSize,
	type TIconSize,
} from '@/presentation/web-ui/uiKit/icon/iconSize';
import { Stack } from '@/presentation/web-ui/uiKit/layout/layout';
import { NavLink } from '@/presentation/web-ui/uiKit/navLink/navLink';
import { cn } from '@/presentation/web-ui/utils/classnames';

type TIconLinkProps = {
	className?: string;

	to: string;

	iconName: TIconName;
	iconSize?: TIconSize;
};

export function IconLink({
	className,
	to,
	iconName,
	iconSize = EIconSize.MEDIUM,
}: TIconLinkProps) {
	return (
		<Stack center asChild>
			<NavLink className={cn('m-0 p-3', className)} to={to}>
				<Icon name={iconName} size={iconSize} />
			</NavLink>
		</Stack>
	);
}
