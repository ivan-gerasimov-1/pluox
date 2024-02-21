import styles from './screen.module.css';

type TScreenProps = {
	children: React.ReactNode;
};

export function Screen(props: TScreenProps) {
	return <div className={styles.container}>{props.children}</div>;
}
