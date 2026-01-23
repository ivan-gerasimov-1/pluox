import type {
	IRepository,
	TFindManyOptions,
	TFindManyResult,
} from '@pluox/core/src/domain/repository/types';
import type { Id } from '@pluox/core/src/domain/types';

import type { IDataSource } from '@pluox/core/src/infrastructure/dataSource/types';
import type { IMapper } from '@pluox/core/src/infrastructure/mapper/types';

export class Repository<
	TEntity extends { id: Id },
	TDto extends { id: Id },
	TFindOptions = {},
> implements IRepository<TEntity, TFindOptions>
{
	constructor(
		protected readonly dataSource: IDataSource<TDto, TFindOptions>,
		protected readonly mapper: IMapper<TDto, TEntity>,
	) {}

	public save(entity: TEntity): TEntity {
		let entityDTO = this.mapper.toDTO(entity);

		this.dataSource.upsert(entityDTO.id, entityDTO);

		return entity;
	}

	public findById(id: Id): TEntity | null {
		let data = this.dataSource.findOne({
			id,
		});

		return data ? this.mapper.toEntity(data) : null;
	}

	public findMany(
		options?: TFindManyOptions<TFindOptions>,
	): TFindManyResult<TEntity> {
		let result = this.dataSource.findMany(options);

		return {
			items: result.items.map((data) => this.mapper.toEntity(data)),
			total: result.total,
		};
	}

	public remove(id: Id): TEntity | null {
		let entityDTO = this.dataSource.findOne({
			id,
		});

		if (entityDTO) {
			this.dataSource.remove(id);

			return this.mapper.toEntity(entityDTO);
		}

		return null;
	}
}
