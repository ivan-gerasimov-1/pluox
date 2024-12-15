import { categoryTemplates } from '@root/core/modules/category/domain/categoryTemplate/templates';

export function getCategoryProperty(
	categoryId: string | null,
	property: 'name' | 'icon',
	defaultValue: string,
): string {
	if (!categoryId) {
		return defaultValue;
	}

	let category = categoryTemplates.find(
		(category) => categoryId === category.id,
	);

	if (!category) {
		return categoryId[0].toUpperCase();
	}

	return Reflect.get(category, property);
}
