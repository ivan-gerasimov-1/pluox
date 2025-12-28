/**
 * @description Work In Progress
 */
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { Backdrop } from '@root/presentation/web-ui/uiKit/backdrop/Backdrop';
import { useAppScale } from '@root/presentation/web-ui/uiKit/dialog/react/hooks/useAppScale';

import styles from './actionSheet.module.css';

const TRANSITION_DURATION = 200;

type TActionSheetProps = {
	id: string;

	close: () => void;
	onUnmount: () => void;

	isOpen: boolean;
};

export function ActionSheet(props: React.PropsWithChildren<TActionSheetProps>) {
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
				onExited={props.onUnmount}
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
