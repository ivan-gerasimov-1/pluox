import { useAppNavigation } from '@root/presentation/web-ui/hooks/useNavigation';
import { useCategoryListQuery } from '@root/presentation/web-ui/modules/categories/queries/categories.queries';

import styles from './categoryList.module.css';

export function CategoryList() {
	let navigate = useAppNavigation();
	let categories = useCategoryListQuery();

	return (
		<ul className={styles.list}>
			{categories.map((category) => (
				<li key={category.id}>
					<button
						type="button"
						className={styles.listItem}
						onClick={() => navigate.categoryPage(category.id)}
					>
						<span className={styles.icon}>
							{category.icon ?? category.name[0]}
						</span>

						<span className={styles.name}>{category.name}</span>
					</button>
				</li>
			))}
		</ul>
	);
}
