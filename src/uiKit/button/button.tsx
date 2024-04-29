import { cls } from '@utils/classnames';
import styles from './button.module.css';

export type TButtonProps = {
	className?: string;
	style?: React.CSSProperties;

	onClick: () => void;
};

export function Button(props: React.PropsWithChildren<TButtonProps>) {
	return (
		<button
			type="button"
			style={props.style}
			className={cls(styles.button, props.className)}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}
