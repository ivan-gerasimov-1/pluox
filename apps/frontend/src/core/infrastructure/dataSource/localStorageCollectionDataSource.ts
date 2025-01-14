import type { Id } from '@domain/types';
import type {
	TFindManyOptions,
	TFindManyResult,
} from '@root/core/domain/repository/types';
import type {
	IDataSource,
	TDtoWithId,
} from '@root/core/infrastructure/dataSource/types';

import { deepMerge } from '@root/core/infrastructure/dataSource/deepMerge';
import { parseSafeToObject } from '@root/core/infrastructure/dataSource/parseSafe';

export class LocalStorageCollectionDataSource<
	TDto extends TDtoWithId,
	TFindOptions,
> implements IDataSource<TDto, TFindOptions>
{
	/** @todo Move to Config */
	static readonly #ID_PREFIX = '@savee';

	readonly #id: string;

	constructor(
		private readonly storage: typeof window.localStorage,
		options: {
			id: Id;
			prefix?: string;
		},
	) {
		this.#id = this.makeId(options.id, options.prefix);
	}

	public upsert(dto: TDto): void {
		let data = this.readDataFromStorage();

		let targetItem = data[dto.id];

		if (targetItem) {
			this.update(dto);
		} else {
			this.insert(dto);
		}
	}

	public insert(dto: TDto, options?: { replace?: boolean }): void {
		let data = this.readDataFromStorage();
		let id = dto.id;

		if (data[id] && !options?.replace) {
			throw new Error(`Item with id ${id} already exists`);
		}

		Reflect.set(data, id, dto);

		this.writeDataToStorage(data);
	}

	public update(dto: TDtoWithId & Partial<TDto>): void {
		let data = this.readDataFromStorage();
		let id = dto.id;
		let item = data[id];

		if (!item) {
			throw new Error(`Item with id ${id} not found`);
		}

		Reflect.set(data, id, deepMerge(item, dto));

		this.writeDataToStorage(data);
	}

	public remove(id: Id): void {
		let data = this.readDataFromStorage();

		Reflect.deleteProperty(data, id);

		this.storage.setItem(this.#id, JSON.stringify(data));
	}

	public findOne(query?: { id?: Id }): TDto | null {
		let data = this.readDataFromStorage();

		if (query?.id) {
			return data[query.id] ?? null;
		}

		return Object.values(data)[0] ?? null;
	}

	public findMany(
		options?: TFindManyOptions<TFindOptions>,
	): TFindManyResult<TDto> {
		let data = this.readDataFromStorage();
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
		this.clearStorage();
	}

	protected readDataFromStorage(): Record<Id, TDto> {
		const rawData = this.storage.getItem(this.#id);

		if (rawData === null) {
			return {};
		}

		return parseSafeToObject(rawData);
	}

	private writeDataToStorage<T>(data: T): void {
		this.storage.setItem(this.#id, JSON.stringify(data));
	}

	private clearStorage(): void {
		this.storage.removeItem(this.#id);
	}

	private makeId(id: Id, prefix?: string): Id {
		let idPrefix = prefix ?? LocalStorageCollectionDataSource.#ID_PREFIX;

		return `${idPrefix}/${id}`;
	}
}
