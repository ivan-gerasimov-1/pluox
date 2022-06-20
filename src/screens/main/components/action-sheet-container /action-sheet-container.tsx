import { classnames } from '@utils/classnames';
import { useState } from 'react';
import styles from './action-sheet-container.module.css';

export function ActionSheetContainer(props: React.PropsWithChildren<{}>) {
	let [isActive, setActive] = useState(false);

	return (
		<div
			className={classnames(styles.actionSheetContainer, {
				[styles.isActive]: isActive,
				[styles.cursorPointer]: !isActive,
			})}
			onClick={(even) => {
				if (isActive) {
					return;
				}

				setActive(true);
			}}
		>
			{isActive && (
				<div className={styles.header}>
					<button
						type="button"
						className={styles.closeButton}
						onClick={(event) => {
							event.stopPropagation();

							setActive(false);
						}}
					>
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
