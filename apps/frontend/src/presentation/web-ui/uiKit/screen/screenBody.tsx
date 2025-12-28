import { cls } from '@root/presentation/web-ui/utils/classnames';

import styles from './screen.module.css';

type TScreenBodyProps = {
	className?: string;
};

export function ScreenBody(props: React.PropsWithChildren<TScreenBodyProps>) {
	return (
		<div className={cls(props.className, styles.body)}>{props.children}</div>
	);
}
