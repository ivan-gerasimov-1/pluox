import { Icon } from '@/presentation/web/uiKit/icon/icon';
import type { TIconName } from '@/presentation/web/uiKit/icon/icons';
import {
	EIconSize,
	type TIconSize,
} from '@/presentation/web/uiKit/icon/iconSize';
import { cn } from '@/presentation/web/utils/classnames';

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
