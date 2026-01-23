import type { TCategoryDTO } from '@pluox/core/src/modules/category/application/dto/categoryDTO';
import { Category } from '@pluox/core/src/modules/category/domain/categoryEntity/category';
import type { ICategory } from '@pluox/core/src/modules/category/domain/categoryEntity/types';
import type { ICategoryMapper } from '@pluox/core/src/modules/category/infrastructure/categoryMapper/types';

export class CategoryMapper implements ICategoryMapper {
	public toDTO(category: ICategory): TCategoryDTO {
		return {
			id: category.id,
			userId: category.userId,
			name: category.name,
			icon: category.icon,
			weight: category.weight,
			createdAt: category.createdAt,
			modifiedAt: category.modifiedAt,
		};
	}

	public toEntity(categoryDTO: TCategoryDTO): ICategory {
		return new Category(
			categoryDTO.id,
			categoryDTO.userId,
			categoryDTO.name,
			categoryDTO.icon,
			categoryDTO.weight,
			categoryDTO.createdAt,
			categoryDTO.modifiedAt,
		);
	}
}
