import type { Id } from '@root/core/domain/types';
import type { TCategoryDTO } from '@root/core/modules/category/application/dto/categoryDTO';

export interface ICategoryDataSource {
	save(category: TCategoryDTO): TCategoryDTO;

	findMany(options?: { orderByWeight?: boolean }): {
		items: TCategoryDTO[];
		total: number;
	};
	/** @todo Not Implemented */
	findOne(query: unknown): TCategoryDTO | null;
	findById(id: Id): TCategoryDTO | null;

	remove(id: Id): TCategoryDTO | null;
}
