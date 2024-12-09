import { getCategoryIcon } from '@domain/categories/getCategoryIcon';

import styles from './categoryIcon.module.css';

export type TCategoryIconProps = {
	categoryId: string | null;
};

export function CategoryIcon(props: TCategoryIconProps) {
	return (
		<span className={styles.icon}>{getCategoryIcon(props.categoryId)}</span>
	);
}
