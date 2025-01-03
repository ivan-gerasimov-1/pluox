import type { Id } from '@root/core/domain/types';
import type { ICategory } from '@root/core/modules/category/domain/categoryEntity/types';
import type {
	ICategoryFindOptions,
	ICategoryRepository,
} from '@root/core/modules/category/domain/categoryRepository/types';
import type { ICategoryDataSource } from '@root/core/modules/category/infrastructure/categoryDataSource/types';
import type { ICategoryMapper } from '@root/core/modules/category/infrastructure/categoryMapper/types';

export class CategoryRepository implements ICategoryRepository {
	constructor(
		private readonly dataSource: ICategoryDataSource,
		private readonly mapper: ICategoryMapper,
	) {}

	public save(category: ICategory): ICategory {
		let categoryDTO = this.mapper.toDTO(category);
		let newCategoryDTO = this.dataSource.save(categoryDTO);

		return this.mapper.toEntity(newCategoryDTO);
	}

	public findMany(options?: ICategoryFindOptions) {
		let result = this.dataSource.findMany({
			orderByWeight: options?.orderByWeight,
		});

		return {
			items: result.items.map(this.mapper.toEntity),
			total: result.total,
		};
	}

	public findOne(): ICategory {
		throw new Error('Not Implemented');
	}

	public findById(id: Id): ICategory | null {
		let category = this.dataSource.findById(id);

		if (!category) {
			return null;
		}

		return this.mapper.toEntity(category);
	}

	public remove(id: Id): ICategory | null {
		let category = this.dataSource.remove(id);

		if (!category) {
			return null;
		}

		return this.mapper.toEntity(category);
	}
}
