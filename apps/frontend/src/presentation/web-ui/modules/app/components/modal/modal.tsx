/**
 * @description Work In Progress
 */
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { Backdrop } from '@root/presentation/web-ui/uiKit/backdrop/Backdrop';

import styles from './modal.module.css';

const TRANSITION_DURATION = 200;

type TModalProps = {
	children: React.ReactNode;

	id: string;

	close: () => void;
	handleUnmount: () => void;

	isOpen: boolean;
};

export function Modal(props: TModalProps) {
	let modalRef = useRef(null);

	return (
		<>
			<Backdrop onClick={props.close} isVisible={props.isOpen} />

			<CSSTransition
				nodeRef={modalRef}
				in={props.isOpen}
				timeout={TRANSITION_DURATION}
				classNames={styles}
				onExited={props.handleUnmount}
				appear
			>
				<div ref={modalRef} id={props.id} className={styles.modalContainer}>
					{props.children}
				</div>
			</CSSTransition>
		</>
	);
}
