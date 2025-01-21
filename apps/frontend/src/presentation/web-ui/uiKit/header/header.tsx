import styles from './header.module.css';

export type THeaderProps = {
	title: string;
};

export function Header(props: THeaderProps) {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{props.title}</h1>
		</div>
	);
}
