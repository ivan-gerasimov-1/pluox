import { useAppNavigation } from '@root/presentation/web-ui/hooks/useNavigation';
import { useCategoryListQuery } from '@root/presentation/web-ui/modules/categories/queries/categories.queries';

import styles from './categoryList.module.css';

export function CategoryList() {
	let navigate = useAppNavigation();
	let categories = useCategoryListQuery();

	return (
		<ul className="gap-2.5 m-0 p-0 flex list-none flex-col">
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
