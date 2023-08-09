import { Icon } from '@ui-kit/icon';
import { classnames } from '@utils/classnames';
import type React from 'react';
import styles from './action-sheet.module.css';
import { useActionSheetContainer } from '@components/action-sheet/useActionSheetContainer';

export function ActionSheet(props: React.PropsWithChildren<{}>) {
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
				<div className={styles.actionSheetWrapper}>{props.children}</div>
			</div>
		</div>
	);
}
