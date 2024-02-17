import { categoryList } from '@domain/categories/constants';

export function getCategoryName(categoryId: string | null): string {
	let defaultName = 'Uncotegorized';

	if (!categoryId) {
		return defaultName;
	}

	let category = categoryList.find((category) => categoryId === category.id);

	if (!category) {
		return categoryId[0].toUpperCase();
	}

	return category.name;
}
