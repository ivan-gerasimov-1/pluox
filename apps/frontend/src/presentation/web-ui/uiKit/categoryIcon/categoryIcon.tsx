import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';
import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';

import styles from './categoryIcon.module.css';

export type TCategoryIconProps = {
	categoryId: string | null;
};

export function CategoryIcon(props: TCategoryIconProps) {
	let categoryService = useService(EServiceToken.CATEGORY_SERVICE);

	return (
		<span className={styles.icon}>
			{categoryService.getCategoryIcon(props.categoryId)}
		</span>
	);
}
