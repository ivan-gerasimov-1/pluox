import { cls } from '@utils/classnames';

import styles from './screen.module.css';

type TScreenProps = {
	children: React.ReactNode;
	className?: string;
};

export function Screen(props: TScreenProps) {
	return (
		<div className={cls(styles.container, props.className)}>
			{props.children}
		</div>
	);
}
