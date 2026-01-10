import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './backdrop.module.css';

export type TBackdropProps = {
	isVisible: boolean;

	onClick?(event: unknown): void;
};

export function Backdrop({ isVisible, onClick }: TBackdropProps) {
	let backdropRef = useRef(null);

	return (
		<CSSTransition
			nodeRef={backdropRef}
			in={isVisible}
			timeout={200}
			classNames={styles}
			appear
			mountOnEnter
			unmountOnExit
		>
			<div ref={backdropRef} className={styles.backdrop} onClick={onClick} />
		</CSSTransition>
	);
}
