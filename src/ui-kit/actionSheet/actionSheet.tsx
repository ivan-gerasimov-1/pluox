import { Icon } from '@ui-kit/icon';
import { classnames } from '@utils/classnames';
import type React from 'react';
import styles from './actionSheet.module.css';
import { useActionSheetContainer } from '@ui-kit/actionSheet/hooks/useActionSheetContainer';
import { Backdrop } from '@ui-kit/actionSheet/components/backdrop/Backdrop';
import { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import actionSheetContainerStyles from './actionSheetContainer.module.css';
import { useScrollLock } from '@ui-kit/hooks/useScrollLock';

export type TActionSheetProps = {
	isOpen?: boolean;
	onClose?(): void;
};

export function ActionSheet(props: React.PropsWithChildren<TActionSheetProps>) {
	let { isOpen, open, close } = useActionSheetContainer(props.isOpen);
	let actionSheetContainerRef = useRef<HTMLDivElement>(null);

	useScrollLock(isOpen);

	let [dragStart, setDragStart] = useState(0);
	let [dragEnd, setDragEnd] = useState(0);

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
		setDragEnd(event.changedTouches[0]?.clientY);

		let diff = event.changedTouches[0]?.clientY - dragStart;

		console.log(diff);

		if (diff >= 50) {
			// @ts-expect-error
			close(event);
		} else {
			// @ts-expect-error
			actionSheetContainerRef.current.style.transform = '';
		}
	}

	function onDrag(event: React.TouchEvent<HTMLDivElement>) {
		let touchData = event.targetTouches[0];

		// dragStart = 100
		// currentDrag = X
		// dragStart * X = 100 * currentDrag
		// x = currentDrag * 100 / dragStart

		// 85 - X
		// X →

		let foo = (touchData.clientY * 100) / dragStart;
		let currentTranslate = 85 - foo;
		// console.log(touchData.clientY);
		// @ts-expect-error
		actionSheetContainerRef.current.style.transform = `translateY(${-currentTranslate}%)`;
		// console.log(actionSheetContainerRef.current?.style.translate);
	}

	return (
		<>
			<Backdrop isVisible={isOpen} onClick={closeActionSheet} />

			<CSSTransition
				nodeRef={actionSheetContainerRef}
				in={isOpen}
				timeout={250}
				classNames={{ ...actionSheetContainerStyles }}
				onExited={() => {
					// @ts-expect-error
					actionSheetContainerRef.current.style.transform = '';
				}}
			>
				<div
					ref={actionSheetContainerRef}
					className={actionSheetContainerStyles.actionSheetContainer}
					onClick={open}
					onTouchStart={onDragStart}
					onTouchEnd={onDragEnd}
					onTouchMove={onDrag}
				>
					{isOpen && (
						<div className={styles.header}>
							<button
								type="button"
								className={styles.closeButton}
								onClick={closeActionSheet}
							>
								<Icon name={Icon.IconName.Close} />
							</button>
						</div>
					)}

					<div
						className={classnames(styles.actionSheetWrapper, {
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
