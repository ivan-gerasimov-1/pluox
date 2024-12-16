import type { Id } from '@root/core/domain/types';
import type { TCategoryDTO } from '@root/core/modules/category/application/dto/categoryDTO';
import type { ICategory } from '@root/core/modules/category/domain/categoryEntity/types';
import type {
	ICategoryFindManyResult,
	ICategoryRepository,
} from '@root/core/modules/category/domain/categoryRepository/types';
import type { ICategoryDataSource } from '@root/core/modules/category/infrastructure/categoryDataSource/types';

export class CategoryRepository implements ICategoryRepository {
	constructor(private readonly dataSource: ICategoryDataSource) {}

	public create(category: ICategory): TCategoryDTO {
		let categoryDto = category.toObject();

		return this.dataSource.save(categoryDto);
	}

	public update(category: ICategory): TCategoryDTO {
		let categoryDto = category.toObject();

		return this.dataSource.save(categoryDto);
	}

	public findMany(options?: {
		orderByWeight?: boolean;
	}): ICategoryFindManyResult {
		let result = this.dataSource.findMany({
			orderByWeight: options?.orderByWeight,
		});

		return {
			items: result.items,
			total: result.total,
		};
	}

	public findOne(): TCategoryDTO {
		throw new Error('Not Implemented');
	}

	public findById(id: Id): TCategoryDTO {
		let category = this.dataSource.findById(id);

		if (!category) {
			throw new Error(`Category with id ${id} not found`);
		}

		return category;
	}

	public remove(id: Id): void {
		this.dataSource.remove(id);
	}
}
