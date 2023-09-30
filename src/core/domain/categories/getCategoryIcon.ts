import { categoryList } from '@domain/categories/constants';

export function getCategoryIcon(categoryId: string | null): string {
	let defaultIcon = '?';

	if (!categoryId) {
		return defaultIcon;
	}

	let category = categoryList.find((category) => categoryId === category.id);

	if (!category) {
		return categoryId[0].toUpperCase();
	}

	return category.icon;
}
