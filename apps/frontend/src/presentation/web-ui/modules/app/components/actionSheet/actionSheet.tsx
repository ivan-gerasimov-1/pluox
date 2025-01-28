/**
 * @description Work In Progress
 */
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './actionSheet.module.css';
import { Backdrop } from '@root/presentation/web-ui/uiKit/backdrop/Backdrop';

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
