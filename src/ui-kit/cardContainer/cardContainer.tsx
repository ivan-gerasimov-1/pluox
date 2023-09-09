import styles from './cardContainer.module.css';

export function CardContainer(props: React.PropsWithChildren<{}>) {
	return <div className={styles.cardContainer}>{props.children}</div>;
}
