import { useMemo } from 'react';

import { useService } from '@root/presentation/web-ui/modules/serviceContainer/useService';
import { EServiceToken } from '@root/presentation/web-ui/modules/serviceContainer/enums';

import styles from './categoryPills.module.css';

type TCategoryPillsProps = {
	value?: string | null;

	onSelect(categoryId?: string): void;
};

export function CategoryPills(props: TCategoryPillsProps) {
	let categoryQueryService = useService(EServiceToken.CATEGORY_QUERY_SERVICE);
	let categories = useMemo(
		() =>
			categoryQueryService.getAll({
				useWeights: true,
			}),
		[],
	);

	return (
		<div className={styles.wrapper}>
			{categories.map((category) => {
				return (
					<button
						key={category.id}
						id={category.id}
						type="button"
						className={styles.pill}
						aria-pressed={category.id === props.value}
						onClick={(event) => {
							let target = event.currentTarget;
							let isPressed = target.getAttribute('aria-pressed') === 'true';
							let nextState = !isPressed;

							for (let category of categories) {
								let element = document.getElementById(category.id);

								if (!element) {
									continue;
								}

								element.setAttribute('aria-pressed', 'false');
							}

							target.setAttribute('aria-pressed', String(nextState));

							props.onSelect(nextState ? target.id : undefined);
						}}
					>
						{category.name}
					</button>
				);
			})}
		</div>
	);
}
