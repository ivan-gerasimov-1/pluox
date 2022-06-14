import styles from './action-sheet-container.module.css';

export function ActionSheetContainer(props: React.PropsWithChildren<{}>) {
	return <div className={styles.actionSheetContainer}>{props.children}</div>;
}
