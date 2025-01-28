/**
 * @description Work In Progress
 */
import { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { Backdrop } from '@root/presentation/web-ui/uiKit/backdrop/Backdrop';

import styles from './actionSheet.module.css';

const TRANSITION_DURATION = 200;

type TActionSheetProps = {
	children: React.ReactNode;

	id: string;

	close: () => void;
	handleUnmount: () => void;

	isOpen: boolean;
};

export function ActionSheet(props: TActionSheetProps) {
	let actionSheetRef = useRef(null);

	useEffect(() => {
		let appRoot = window.document.getElementById('saveeRoot');

		requestAnimationFrame(() => {
			if (props.isOpen) {
				appRoot?.classList.add('savee-action-sheet-open');
			} else {
				appRoot?.classList.add('savee-action-sheet-before-close');
			}
		});

		return () => {
			requestAnimationFrame(() => {
				appRoot?.classList.remove(
					'savee-action-sheet-open',
					'savee-action-sheet-before-close',
				);
			});
		};
	}, [props.isOpen]);

	return (
		<>
			<Backdrop onClick={props.close} isVisible={props.isOpen} />

			<CSSTransition
				nodeRef={actionSheetRef}
				in={props.isOpen}
				timeout={TRANSITION_DURATION}
				classNames={styles}
				onExited={props.handleUnmount}
				appear
			>
				<div
					ref={actionSheetRef}
					id={props.id}
					className={styles.actionSheetContainer}
				>
					{props.children}
				</div>
			</CSSTransition>
		</>
	);
}
