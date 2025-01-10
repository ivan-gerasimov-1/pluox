import type { Id, IUseCase } from '@root/core/domain/types';
import type {
	TCategoryCreateDTO,
	TCategoryUpdateDTO,
} from '@root/core/modules/category/application/dto/categoryDTO';

export interface ICategoryUseCase {
	create(categoryCreateDTO: TCategoryCreateDTO): void;
	update(id: Id, categoryUpdateDTO: TCategoryUpdateDTO): void;
	delete(id: Id): void;
	increaseWeight(id: Id): void;
	decreaseWeight(id: Id): void;
}

export interface ICategoryCreateUseCase extends IUseCase {
	execute(categoryCreateDTO: TCategoryCreateDTO): void;
}

export interface ICategoryUpdateUseCase extends IUseCase {
	execute(id: Id, categoryUpdateDTO: TCategoryUpdateDTO): void;
}

export interface ICategoryDeleteUseCase extends IUseCase {
	execute(id: Id): void;
}

export interface ICategoryWeightUseCase extends IUseCase {
	execute(id: Id, command: TCategoryWeightChangeCommand): void;
}

export type TCategoryWeightChangeCommand = 'increase' | 'decrease';
