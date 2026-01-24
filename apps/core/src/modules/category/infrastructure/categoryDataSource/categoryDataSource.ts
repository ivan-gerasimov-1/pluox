import type {
	TFindManyOptions,
	TFindManyResult,
} from '@core/domain/repository/types';

import { DataSource } from '@core/infrastructure/dataSource/dataSource';

import type { TCategoryDTO } from '@core/modules/category/application/dto/categoryDTO';
import type { TCategoryFindOptions } from '@core/modules/category/domain/categoryRepository/types';
import type { ICategoryDataSource } from '@core/modules/category/infrastructure/categoryDataSource/types';

export class CategoryDataSource
	extends DataSource<TCategoryDTO, TCategoryFindOptions>
	implements ICategoryDataSource
{
	public override findMany(
		options?: TFindManyOptions<TCategoryFindOptions>,
	): TFindManyResult<TCategoryDTO> {
		let categories: TCategoryDTO[] = this.findAll();

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
