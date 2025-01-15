import type { Id } from '@domain/types';
import type {
	TFindManyOptions,
	TFindManyResult,
} from '@root/core/domain/repository/types';
import type { ICustomCollection } from '@root/core/infrastructure/customStorage/types';
import type {
	IDataSource,
	TDtoWithId,
} from '@root/core/infrastructure/dataSource/types';

export class LocalStorageCollectionDataSource<
	TDto extends TDtoWithId,
	TFindOptions,
> implements IDataSource<TDto, TFindOptions>
{
	constructor(private readonly collection: ICustomCollection) {}

	public upsert(dto: TDto): void {
		let hasItem = this.collection.has(dto.id);

		if (hasItem) {
			this.update(dto);
		} else {
			this.insert(dto);
		}
	}

	public insert(dto: TDto, options?: { replace?: boolean }): void {
		let hasItem = this.collection.has(dto.id);

		if (hasItem && !options?.replace) {
			throw new Error(`Item with id ${dto.id} already exists`);
		}

		this.collection.writeOne(dto);
	}

	public update(dto: TDtoWithId & Partial<TDto>): void {
		let hasItem = this.collection.has(dto.id);

		if (!hasItem) {
			throw new Error(`Item with id ${dto.id} not found`);
		}

		this.collection.updateOne(dto.id, dto);
	}

	public remove(id: Id): void {
		this.collection.removeOne(id);
	}

	public findOne(query?: { id?: Id }): TDto | null {
		if (query?.id) {
			return this.collection.readOne(query.id);
		}

		let items: TDto[] = this.collection.readAll();

		return items[0] ?? null;
	}

	public findMany(
		options?: TFindManyOptions<TFindOptions>,
	): TFindManyResult<TDto> {
		let items: TDto[] = this.collection.readAll();

		if (options?.limit) {
			items = items.slice(0, options.limit);
		}

		return {
			items,
			total: items.length,
		};
	}

	public findAll(): TDto[] {
		return this.collection.readAll();
	}

	public clear(): void {
		this.collection.drop();
	}
}
