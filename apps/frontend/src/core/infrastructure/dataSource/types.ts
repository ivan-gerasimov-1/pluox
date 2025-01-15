import type {
	TFindManyOptions,
	TFindManyResult,
} from '@root/core/domain/repository/types';
import type { Id } from '@root/core/domain/types';

export type TDtoWithId = {
	id: Id;
};

export interface IDataSource<TDto, TFindOptions = never> {
	upsert(dto: TDto): void;
	insert(
		dto: TDto,
		options?: {
			replace?: boolean;
		},
	): void;
	update(dto: Partial<TDto>): void;

	findOne(query?: { id?: Id }): TDto | null;
	findMany(options?: TFindManyOptions<TFindOptions>): TFindManyResult<TDto>;
	findAll(): TDto[];

	remove(id: Id): void;

	clear(): void;
}
