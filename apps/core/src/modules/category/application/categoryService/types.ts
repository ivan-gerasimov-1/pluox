export interface ICategoryService {
	getCategoryIcon(categoryId: string | null): string;
	getCategoryName(categoryId: string | null): string;
}
