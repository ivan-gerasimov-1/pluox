import { cls } from '@root/presentation/web-ui/utils/classnames';

import styles from './loader.module.css';

type TLoaderProps = {
	className?: string;
	style?: React.CSSProperties;
};

export function Loader(props: TLoaderProps) {
	return (
		<div
			style={props.style}
			className={cls(styles.loader, props.className)}
		></div>
	);
}
