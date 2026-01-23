import type {
	TFindManyOptions,
	TFindManyResult,
} from '@pluox/core/src/domain/repository/types';
import type { Id } from '@pluox/core/src/domain/types';

export interface IDataSource<TDto, TFindOptions = {}> {
	upsert(id: Id, dto: TDto): void;
	insert(
		id: Id,
		dto: TDto,
		options?: {
			replace?: boolean;
		},
	): void;
	update(id: Id, dto: Partial<TDto>): void;

	findOne(query?: { id?: Id }): TDto | null;
	findMany(options?: TFindManyOptions<TFindOptions>): TFindManyResult<TDto>;
	findAll(): TDto[];

	remove(id: Id): void;

	clear(): void;
}
