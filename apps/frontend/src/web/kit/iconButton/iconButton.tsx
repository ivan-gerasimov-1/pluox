import { cn } from '@/web/utils/classnames';

import { Icon } from '@kit/icon/icon';
import type { TIconName } from '@kit/icon/icons';
import { EIconSize, type TIconSize } from '@kit/icon/iconSize';

export type TIconButtonProps = {
	className?: string;

	onClick?: () => void;

	iconName: TIconName;
	iconSize?: TIconSize;
};

export function IconButton({
	className,
	onClick,
	iconName,
	iconSize,
}: TIconButtonProps) {
	return (
		<button
			type="button"
			className={cn(
				'm-0 p-2 flex items-center border-0 bg-transparent text-inherit',
				className,
			)}
			onClick={onClick}
		>
			<Icon name={iconName} size={iconSize || EIconSize.MEDIUM} />
		</button>
	);
}
