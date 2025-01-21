import { cls } from '@root/presentation/web-ui/utils/classnames';

import styles from './screen.module.css';

type TScreenBodyProps = {
	children: React.ReactNode;
	className?: string;
};

export function ScreenBody(props: TScreenBodyProps) {
	return (
		<div className={cls(props.className, styles.body)}>{props.children}</div>
	);
}
