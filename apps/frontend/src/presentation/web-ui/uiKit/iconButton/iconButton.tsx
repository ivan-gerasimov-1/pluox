import { Icon } from '@root/presentation/web-ui/uiKit/icon/icon';
import type { TIconName } from '@root/presentation/web-ui/uiKit/icon/icons';
import {
	EIconSize,
	type TIconSize,
} from '@root/presentation/web-ui/uiKit/icon/iconSize';

export type TIconButtonProps = {
	onClick?: () => void;

	iconName: TIconName;
	iconSize?: TIconSize;
};

export function IconButton(props: TIconButtonProps) {
	return (
		<button
			type="button"
			className="m-0 p-2 flex items-center border-0 bg-transparent text-inherit"
			onClick={props.onClick}
		>
			<Icon name={props.iconName} size={props.iconSize || EIconSize.MEDIUM} />
		</button>
	);
}
