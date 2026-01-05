import { cls } from '@root/presentation/web-ui/utils/classnames';

import styles from './button.module.css';

export type TButtonProps = {
	className?: string;

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
			form?: string;

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
	let form = props.type === 'submit' && props.form ? props.form : undefined;

	return (
		<button
			type={type}
			form={form}
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
