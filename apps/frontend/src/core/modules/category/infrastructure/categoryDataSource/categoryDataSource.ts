import type {
	TFindManyOptions,
	TFindManyResult,
} from '@root/core/domain/repository/types';
import { InMemoryDataSource } from '@root/core/infrastructure/dataSource/inMemoryDataSource';
import type { TCategoryDTO } from '@root/core/modules/category/application/dto/categoryDTO';
import type { ICategoryFindOptions } from '@root/core/modules/category/domain/categoryRepository/types';
import type { ICategoryDataSource } from '@root/core/modules/category/infrastructure/categoryDataSource/types';

export class CategoryInMemoryDataSource
	extends InMemoryDataSource<TCategoryDTO, ICategoryFindOptions>
	implements ICategoryDataSource
{
	public override findMany(
		options?: TFindManyOptions<ICategoryFindOptions>,
	): TFindManyResult<TCategoryDTO> {
		let categories: TCategoryDTO[] = [...this.storage.values()];

		if (options?.orderByWeight) {
			categories = this.sortByWeight(categories);
		}

		if (options?.limit) {
			categories = categories.slice(0, options.limit);
		}

		return {
			items: categories,
			total: categories.length,
		};
	}

	/**
	 * @description
	 * Sort categories by weight.
	 * WARNING: this method mutates the original array
	 */
	private sortByWeight(categoryList: TCategoryDTO[]): TCategoryDTO[] {
		return categoryList.sort((aCategory, bCategory) => {
			if (aCategory.weight > bCategory.weight) {
				return -1;
			}

			if (aCategory.weight < bCategory.weight) {
				return 1;
			}

			return 0;
		});
	}
}
