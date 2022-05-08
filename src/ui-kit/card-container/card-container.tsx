import styles from './card-container.module.css';

export function CardContainer(props: React.PropsWithChildren<{}>) {
	return <div className={styles.cardContainer}>{props.children}</div>;
}
