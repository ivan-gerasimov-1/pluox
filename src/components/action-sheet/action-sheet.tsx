import React from 'react';
import styles from './action-sheet.module.css';

export function ActionSheet(props: React.PropsWithChildren<{}>) {
	return <div className={styles.actionSheetWrapper}>{props.children}</div>;
}
