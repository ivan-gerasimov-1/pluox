import { classnames } from '@utils/classnames';
import React, { useState } from 'react';
import styles from './action-sheet-container.module.css';

export function ActionSheetContainer(props: React.PropsWithChildren<{}>) {
	let [isActive, setActive] = useState(false);

	function open() {
		if (isActive) {
			return;
		}

		setActive(true);
	}

	function close(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		event.stopPropagation();

		setActive(false);
	}

	return (
		<div
			className={classnames(styles.actionSheetContainer, {
				[styles.isActive]: isActive,
				[styles.cursorPointer]: !isActive,
			})}
			onClick={open}
		>
			{isActive && (
				<div className={styles.header}>
					<button type="button" className={styles.closeButton} onClick={close}>
						X
					</button>
				</div>
			)}

			<div
				className={classnames({
					[styles.noPointerEvents]: !isActive,
				})}
			>
				{props.children}
			</div>
		</div>
	);
}
