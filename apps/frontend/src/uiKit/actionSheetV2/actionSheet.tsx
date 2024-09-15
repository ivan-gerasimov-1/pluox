import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { cls } from '@utils/classnames';

import { Backdrop } from '@root/uiKit/actionSheetV2/components/backdrop/Backdrop';

import styles from './actionSheet.module.css';
import actionSheetContainerStyles from './actionSheetContainer.module.css';

export type TActionSheetProps = {
	isOpen?: boolean;
	onClose?(): void;
	height?: 'small' | 'medium' | 'full';
};

export function ActionSheet(props: React.PropsWithChildren<TActionSheetProps>) {
	let height = props.height || 'full';
	let actionSheetContainerRef = useRef<HTMLDivElement>(null);

	let [isOpen, setIsOpen] = useState<boolean>(Boolean(props.isOpen));
	let [isMount, setIsMount] = useState<boolean>(false);

	useEffect(() => {
		setIsMount(true);

		return () => setIsMount(false);
	}, []);

	useEffect(() => {
		setIsOpen(Boolean(props.isOpen));
	}, [props.isOpen]);

	return (
		<>
			<Backdrop
				isVisible={isOpen}
				onClick={() => {
					setIsOpen(false);
				}}
			/>

			<CSSTransition
				nodeRef={actionSheetContainerRef}
				in={isMount && isOpen}
				timeout={250}
				classNames={actionSheetContainerStyles}
				appear
				mountOnEnter
				unmountOnExit
				onExited={() => {
					if (props.onClose) {
						props.onClose();
					}
				}}
			>
				<div
					ref={actionSheetContainerRef}
					className={cls(
						actionSheetContainerStyles.actionSheetContainer,
						actionSheetContainerStyles[height],
					)}
					onClick={() => {
						setIsOpen(true);
					}}
				>
					<div className={styles.header}>
						<div className={styles.pinch} />
					</div>

					<div className={styles.actionSheetWrapper}>{props.children}</div>
				</div>
			</CSSTransition>
		</>
	);
}
