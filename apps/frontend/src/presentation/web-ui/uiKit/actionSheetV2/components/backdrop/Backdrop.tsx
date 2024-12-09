import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './backdrop.module.css';

export type TBackdropProps = {
	isVisible: boolean;

	onClick?(event: unknown): void;
};

export function Backdrop(props: TBackdropProps) {
	let backdropRef = useRef(null);

	return (
		<CSSTransition
			nodeRef={backdropRef}
			in={props.isVisible}
			timeout={250}
			classNames={{ ...styles }}
			mountOnEnter
			unmountOnExit
		>
			<div
				ref={backdropRef}
				className={styles.backdrop}
				onClick={props.onClick}
			/>
		</CSSTransition>
	);
}
