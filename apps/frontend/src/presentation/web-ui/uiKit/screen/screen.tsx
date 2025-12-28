import { cls } from '@root/presentation/web-ui/utils/classnames';

import styles from './screen.module.css';

type TScreenProps = {
	className?: string;
};

export function Screen(props: React.PropsWithChildren<TScreenProps>) {
	return (
		<div className={cls(styles.container, props.className)}>
			{props.children}
		</div>
	);
}
