import { getCategoryProperty } from '@root/core/domain/categories/getCategoryProperty';

export function getCategoryName(categoryId: string | null): string {
	return getCategoryProperty(categoryId, 'name', 'Uncategorized');
}
