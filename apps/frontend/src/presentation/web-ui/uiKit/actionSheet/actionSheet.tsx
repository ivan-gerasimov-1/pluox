import { cls } from '@root/presentation/web-ui/utils/classnames';
import type React from 'react';
import styles from './actionSheet.module.css';
import { useActionSheetContainer } from '@root/presentation/web-ui/uiKit/actionSheet/hooks/useActionSheetContainer';
import { Backdrop } from '@root/presentation/web-ui/uiKit/actionSheet/components/backdrop/Backdrop';
import { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import actionSheetContainerStyles from './actionSheetContainer.module.css';
import { useScrollLock } from '@root/presentation/web-ui/uiKit/hooks/useScrollLock';

export type TActionSheetProps = {
	isOpen?: boolean;
	onClose?(): void;
};

export function ActionSheet(props: React.PropsWithChildren<TActionSheetProps>) {
	let { isOpen, open, close } = useActionSheetContainer(props.isOpen);
	let actionSheetContainerRef = useRef<HTMLDivElement>(null);
	let [actionSheetEnd] = useState(() => {
		return Number.parseFloat(
			getComputedStyle(document.documentElement).getPropertyValue(
				'--action-sheet-end',
			),
		);
	});

	useScrollLock(isOpen);

	let [dragStart, setDragStart] = useState(0);

	function closeActionSheet(event: React.MouseEvent<any, MouseEvent>) {
		if (props.onClose) {
			props.onClose();
		}

		close(event);
	}

	function onDragStart(event: React.TouchEvent<HTMLDivElement>) {
		setDragStart(event.targetTouches[0]?.clientY);
	}

	function onDragEnd(event: React.TouchEvent<HTMLDivElement>) {
		let diff = event.changedTouches[0]?.clientY - dragStart;

		if (diff >= 100) {
			/** @todo remove ts-expect-error */
			// @ts-expect-error
			close(event);
		} else {
			document.documentElement.style.setProperty(
				'--action-sheet-end',
				`${actionSheetEnd}%`,
			);
		}
	}

	function onDrag(event: React.TouchEvent<HTMLDivElement>) {
		let touchData = event.targetTouches[0];

		let diff = (touchData.clientY * 100) / dragStart;
		let currentTranslate = 85 - diff;

		if (currentTranslate >= 0) {
			return;
		}

		document.documentElement.style.setProperty(
			'--action-sheet-end',
			`${-currentTranslate}%`,
		);
	}

	function onExited() {
		document.documentElement.style.setProperty(
			'--action-sheet-end',
			`${actionSheetEnd}%`,
		);
	}

	return (
		<>
			<Backdrop isVisible={isOpen} onClick={closeActionSheet} />

			<CSSTransition
				nodeRef={actionSheetContainerRef}
				in={isOpen}
				timeout={250}
				classNames={{ ...actionSheetContainerStyles }}
				onExited={onExited}
			>
				<div
					ref={actionSheetContainerRef}
					className={actionSheetContainerStyles.actionSheetContainer}
					onMouseDown={open}
					onTouchStart={onDragStart}
					onTouchEnd={onDragEnd}
					onTouchMove={onDrag}
				>
					<div className={styles.header}>
						<div className={styles.pinch} />
					</div>

					<div
						className={cls(styles.actionSheetWrapper, {
							[styles.noPointerEvents]: !isOpen,
						})}
					>
						{props.children}
					</div>
				</div>
			</CSSTransition>
		</>
	);
}
