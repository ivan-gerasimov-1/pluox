import { cls } from '@root/presentation/web-ui/utils/classnames';
import styles from './button.module.css';

export type TButtonProps = {
	type?: 'button' | 'submit';

	className?: string;
	style?: React.CSSProperties;
	color?: 'red' | 'none';
	size?: 's' | 'm' | 'l';
	isWide?: boolean;

	onClick: () => void;
};

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
			onMouseDown={props.onClick}
		>
			{props.children}
		</button>
	);
}
