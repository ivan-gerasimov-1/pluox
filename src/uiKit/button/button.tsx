import { cls } from '@utils/classnames';
import styles from './button.module.css';

export type TButtonProps = {
	className?: string;
	style?: React.CSSProperties;
	color?: 'red' | 'none';
	size?: 's' | 'm' | 'l';
	isWide?: boolean;

	onClick: () => void;
};

export function Button(props: React.PropsWithChildren<TButtonProps>) {
	let color = props.color || 'none';
	let size = props.size || 'm';
	let isWide = Boolean(props.isWide);

	return (
		<button
			type="button"
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
