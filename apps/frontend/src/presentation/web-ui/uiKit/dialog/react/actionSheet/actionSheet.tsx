/**
 * @description Work In Progress
 */
import { Backdrop } from '@/presentation/web-ui/uiKit/backdrop/Backdrop';
import { useAppScale } from '@/presentation/web-ui/uiKit/dialog/react/hooks/useAppScale';
import { Pinch } from '@/presentation/web-ui/uiKit/pinch/pinch';
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './actionSheet.module.css';

const TRANSITION_DURATION = 200;

type TActionSheetProps = {
	id: string;

	close: () => void;
	onUnmount: () => void;

	isOpen: boolean;
};

export function ActionSheet({
	id,
	isOpen,
	close,
	onUnmount,
	children,
}: React.PropsWithChildren<TActionSheetProps>) {
	let actionSheetRef = useRef(null);

	useAppScale(isOpen);

	return (
		<>
			<Backdrop onClick={close} isVisible={isOpen} />

			<CSSTransition
				nodeRef={actionSheetRef}
				in={isOpen}
				timeout={TRANSITION_DURATION}
				classNames={styles}
				onExited={onUnmount}
				appear
			>
				<div
					id={id}
					ref={actionSheetRef}
					className={styles.actionSheetContainer}
				>
					<Pinch />

					{children}
				</div>
			</CSSTransition>
		</>
	);
}
