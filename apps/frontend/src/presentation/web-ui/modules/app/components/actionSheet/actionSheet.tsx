/**
 * @description Work In Progress
 */
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useAppScale } from '@root/presentation/web-ui/modules/app/components/actionSheet/useAppScale';
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

	useAppScale(props.isOpen);

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
					<div className={styles.pinch} onClick={props.close} />

					{props.children}
				</div>
			</CSSTransition>
		</>
	);
}
