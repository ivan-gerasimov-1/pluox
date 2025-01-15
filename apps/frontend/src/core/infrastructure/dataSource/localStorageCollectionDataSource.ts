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

import { deepMerge } from '@root/core/infrastructure/dataSource/deepMerge';

export class LocalStorageCollectionDataSource<
	TDto extends TDtoWithId,
	TFindOptions,
> implements IDataSource<TDto, TFindOptions>
{
	constructor(private readonly collection: ICustomCollection) {}

	public upsert(dto: TDto): void {
		let data = this.collection.readData();

		let targetItem = data[dto.id];

		if (targetItem) {
			this.update(dto);
		} else {
			this.insert(dto);
		}
	}

	public insert(dto: TDto, options?: { replace?: boolean }): void {
		let data = this.collection.readData();
		let id = dto.id;

		if (data[id] && !options?.replace) {
			throw new Error(`Item with id ${id} already exists`);
		}

		Reflect.set(data, id, dto);

		this.collection.writeData(data);
	}

	public update(dto: TDtoWithId & Partial<TDto>): void {
		let data = this.collection.readData();
		let id = dto.id;
		let item = data[id];

		if (!item) {
			throw new Error(`Item with id ${id} not found`);
		}

		Reflect.set(data, id, deepMerge(item, dto));

		this.collection.writeData(data);
	}

	public remove(id: Id): void {
		let data = this.collection.readData();

		Reflect.deleteProperty(data, id);

		this.collection.writeData(data);
	}

	public findOne(query?: { id?: Id }): TDto | null {
		let data: Record<Id, TDto> = this.collection.readData();

		if (query?.id) {
			return data[query.id] ?? null;
		}

		return Object.values(data)[0] ?? null;
	}

	public findMany(
		options?: TFindManyOptions<TFindOptions>,
	): TFindManyResult<TDto> {
		let data: Record<Id, TDto> = this.collection.readData();
		let items = Object.values(data);

		if (options?.limit) {
			items = items.slice(0, options.limit);
		}

		return {
			items,
			total: items.length,
		};
	}

	public drop(): void {
		this.collection.clearData();
	}

	protected readDataFromStorage(): Record<Id, TDto> {
		return this.collection.readData();
	}
}
