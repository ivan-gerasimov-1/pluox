import { Icon } from '@ui-kit/icon';
import { classnames } from '@utils/classnames';
import type React from 'react';
import styles from './action-sheet-container.module.css';
import { useActionSheetContainer } from '@screens/main/components/action-sheet-container /useActionSheetContainer';

export function ActionSheetContainer(props: React.PropsWithChildren<{}>) {
	let { isOpen, open, close } = useActionSheetContainer();

	return (
		<div
			className={classnames(styles.actionSheetContainer, {
				[styles.isActive]: isOpen,
				[styles.cursorPointer]: !isOpen,
			})}
			onClick={open}
		>
			{isOpen && (
				<div className={styles.header}>
					<button type="button" className={styles.closeButton} onClick={close}>
						<Icon name={Icon.IconName.Close} />
					</button>
				</div>
			)}

			<div
				className={classnames({
					[styles.noPointerEvents]: !isOpen,
				})}
			>
				{props.children}
			</div>
		</div>
	);
}
