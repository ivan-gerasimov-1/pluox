import { AppLink } from '@/presentation/web-ui/uiKit/appLink/appLink';
import { Icon } from '@/presentation/web-ui/uiKit/icon/icon';
import type { TIconName } from '@/presentation/web-ui/uiKit/icon/icons';
import {
	EIconSize,
	type TIconSize,
} from '@/presentation/web-ui/uiKit/icon/iconSize';
import { Stack } from '@/presentation/web-ui/uiKit/layout/layout';
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
			<AppLink to={to} className={cn('m-0 p-3', className)}>
				<Icon name={iconName} size={iconSize} />
			</AppLink>
		</Stack>
	);
}
