import type { Id, IUseCase } from '@pluox/core/src/domain/types';

import type {
	TCategoryCreateDTO,
	TCategoryUpdateDTO,
} from '@pluox/core/src/modules/category/application/dto/categoryDTO';

export interface ICategoryUseCase {
	initialize(): void;
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

export interface ICategoryInitializeUseCase extends IUseCase {
	execute(): void;
}
