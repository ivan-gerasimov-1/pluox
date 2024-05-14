import { cls } from '@utils/classnames';
import styles from './button.module.css';

export type TButtonProps = {
	className?: string;
	style?: React.CSSProperties;
	color?: 'red' | 'none';

	onClick: () => void;
};

export function Button(props: React.PropsWithChildren<TButtonProps>) {
	let color = props.color || 'none';

	return (
		<button
			type="button"
			style={props.style}
			className={cls(styles.button, props.className, {
				[styles[color]]: true,
			})}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}
