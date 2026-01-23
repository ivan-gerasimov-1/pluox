import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { Backdrop } from '@/web/uiKit/backdrop/Backdrop';
import { useScale } from '@/web/uiKit/dialog/react/hooks/useScale';
import { Pinch } from '@/web/uiKit/pinch/pinch';

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

	useScale(isOpen);

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
