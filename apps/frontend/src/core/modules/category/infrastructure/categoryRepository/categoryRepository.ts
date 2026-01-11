import { Repository } from '@/core/infrastructure/repository/repository';

import type { TCategoryDTO } from '@/core/modules/category/application/dto/categoryDTO';
import type { ICategory } from '@/core/modules/category/domain/categoryEntity/types';
import type {
	ICategoryRepository,
	TCategoryFindOptions,
} from '@/core/modules/category/domain/categoryRepository/types';
import type { ICategoryDataSource } from '@/core/modules/category/infrastructure/categoryDataSource/types';
import type { ICategoryMapper } from '@/core/modules/category/infrastructure/categoryMapper/types';

export class CategoryRepository
	extends Repository<ICategory, TCategoryDTO, TCategoryFindOptions>
	implements ICategoryRepository
{
	constructor(
		private readonly categoryDataSource: ICategoryDataSource,
		private readonly categoryMapper: ICategoryMapper,
	) {
		super(categoryDataSource, categoryMapper);
	}

	public findMany(options?: TCategoryFindOptions) {
		let result = this.categoryDataSource.findMany({
			orderByWeight: options?.orderByWeight,
		});

		return {
			items: result.items.map(this.categoryMapper.toEntity),
			total: result.total,
		};
	}
}
