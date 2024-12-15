import { categoryList } from '@domain/categories/constants';

export function getCategoryProperty(
	categoryId: string | null,
	property: 'name' | 'icon',
	defaultValue: string,
): string {
	if (!categoryId) {
		return defaultValue;
	}

	let category = categoryList.find((category) => categoryId === category.id);

	if (!category) {
		return categoryId[0].toUpperCase();
	}

	return Reflect.get(category, property);
}
