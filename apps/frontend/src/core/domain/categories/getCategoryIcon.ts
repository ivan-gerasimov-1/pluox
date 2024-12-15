import { getCategoryProperty } from '@root/core/domain/categories/getCategoryProperty';

export function getCategoryIcon(categoryId: string | null): string {
	return getCategoryProperty(categoryId, 'icon', '?');
}
