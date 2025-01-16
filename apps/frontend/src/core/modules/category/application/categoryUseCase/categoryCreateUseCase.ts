import type { IIdGenerator } from '@root/core/domain/idGenerator/types';
import type { ITemporal } from '@root/core/domain/temporal/types';
import type { ICategoryCreateUseCase } from '@root/core/modules/category/application/categoryUseCase/types';
import type { TCategoryCreateDTO } from '@root/core/modules/category/application/dto/categoryDTO';
import type { ICategoryRepository } from '@root/core/modules/category/domain/categoryRepository/types';
import type { ICategoryMapper } from '@root/core/modules/category/infrastructure/categoryMapper/types';

export class CategoryCreateUseCase implements ICategoryCreateUseCase {
	constructor(
		private readonly idGenerator: IIdGenerator,
		private readonly temporal: ITemporal,
		private readonly categoryMapper: ICategoryMapper,
		private readonly categoryRepository: ICategoryRepository,
	) {}

	public execute(categoryCreateDTO: TCategoryCreateDTO): void {
		this.createFromDTO(categoryCreateDTO);
	}

	public createFromDTO(categoryCreateDTO: TCategoryCreateDTO): void {
		let id = categoryCreateDTO.id ?? this.idGenerator.getId();
		let userId = categoryCreateDTO.userId;
		let weight = categoryCreateDTO.weight ?? 1;
		let createdAt =
			categoryCreateDTO.createdAt ?? this.temporal.getISODateString();
		let modifiedAt = categoryCreateDTO.modifiedAt ?? createdAt;

		let category = this.categoryMapper.toEntity({
			id,
			userId,
			name: categoryCreateDTO.name,
			icon: categoryCreateDTO.icon,
			weight,
			createdAt,
			modifiedAt,
		});

		this.categoryRepository.save(category);
	}
}
