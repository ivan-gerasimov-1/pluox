import { Icon } from '@root/presentation/web-ui/uiKit/icon/icon';
import type { TIconName } from '@root/presentation/web-ui/uiKit/icon/icons';
import {
	EIconSize,
	type TIconSize,
} from '@root/presentation/web-ui/uiKit/icon/iconSize';
import { cls } from '@root/presentation/web-ui/utils/classnames';

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
			className={cls(
				'm-0 p-2 flex items-center border-0 bg-transparent text-inherit',
				className,
			)}
			onClick={onClick}
		>
			<Icon name={iconName} size={iconSize || EIconSize.MEDIUM} />
		</button>
	);
}
