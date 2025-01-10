import type { Id } from '@root/core/domain/types';
import type {
	ICategoryCreateUseCase,
	ICategoryDeleteUseCase,
	ICategoryUpdateUseCase,
	ICategoryUseCase,
} from '@root/core/modules/category/application/categoryUseCase/types';
import type {
	TCategoryCreateDTO,
	TCategoryUpdateDTO,
} from '@root/core/modules/category/application/dto/categoryDTO';

export class CategoryUseCase implements ICategoryUseCase {
	constructor(
		private readonly categoryCreateUseCase: ICategoryCreateUseCase,
		private readonly categoryDeleteUseCase: ICategoryDeleteUseCase,
		private readonly categoryUpdateUseCase: ICategoryUpdateUseCase,
	) {}

	public create(categoryCreateDTO: TCategoryCreateDTO): void {
		this.categoryCreateUseCase.execute(categoryCreateDTO);
	}

	public update(id: Id, categoryUpdateDTO: TCategoryUpdateDTO): void {
		this.categoryUpdateUseCase.execute(id, categoryUpdateDTO);
	}

	public delete(id: Id): void {
		this.categoryDeleteUseCase.execute(id);
	}
}
