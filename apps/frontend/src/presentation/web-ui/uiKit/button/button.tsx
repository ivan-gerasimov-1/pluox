import { cls } from '@root/presentation/web-ui/utils/classnames';

import styles from './button.module.css';

export type TButtonProps = {
	className?: string;
	style?: React.CSSProperties;

	color?: 'red' | 'none';
	size?: 's' | 'm' | 'l';
	isWide?: boolean;
} & (
	| {
			type?: 'button';

			onClick: () => void;
	  }
	| {
			type: 'submit';

			onClick?: () => void;
	  }
);

/**
 * @todo
 * 1. Investigate usage of onPointerDown/onKeyDown
 */
export function Button(props: React.PropsWithChildren<TButtonProps>) {
	let type = props.type ?? 'button';
	let color = props.color || 'none';
	let size = props.size || 'm';
	let isWide = Boolean(props.isWide);

	return (
		<button
			type={type}
			style={props.style}
			className={cls(styles.button, props.className, styles[size], {
				[styles[color]]: true,
				[styles.wide]: isWide,
			})}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}
