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

export class LocalStorageCollectionDataSource<
	TDto extends TDtoWithId,
	TFindOptions,
> implements IDataSource<TDto, TFindOptions>
{
	/** @todo Move to Config */
	static readonly #ID_PREFIX = '@savee';

	/** @todo Move to DI */
	readonly #storage = window.localStorage;

	readonly #id: string;

	constructor(
		storageId: string,
		private readonly options?: {
			prefix: string;
		},
	) {
		this.#id = this.makeId(storageId);
	}

	public upsert(dto: TDto): void {
		let data = this.read();

		let targetItem = data[dto.id];

		if (targetItem) {
			this.update(dto);
		} else {
			this.insert(dto);
		}
	}

	public insert(dto: TDto, options?: { replace?: boolean }): void {
		let data = this.read();
		let id = dto.id;

		if (data[id] && !options?.replace) {
			throw new Error(`Item with id ${id} already exists`);
		}

		Reflect.set(data, id, dto);

		this.#storage.setItem(this.#id, JSON.stringify(data));
	}

	public update(dto: TDtoWithId & Partial<TDto>): void {
		let data = this.read();
		let id = dto.id;
		let item = data[id];

		if (!item) {
			throw new Error(`Item with id ${id} not found`);
		}

		Reflect.set(data, id, deepMerge(item, dto));

		this.#storage.setItem(this.#id, JSON.stringify(data));
	}

	public remove(id: Id): void {
		let data = this.read();

		Reflect.deleteProperty(data, id);

		this.#storage.setItem(this.#id, JSON.stringify(data));
	}

	public findOne(query?: { id?: Id }): TDto | null {
		let data = this.read();

		if (query?.id) {
			return data[query.id] ?? null;
		}

		return Object.values(data)[0] ?? null;
	}

	public findMany(
		options?: TFindManyOptions<TFindOptions>,
	): TFindManyResult<TDto> {
		let data = this.read();
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
		this.#storage.removeItem(this.#id);
	}

	protected read(): Record<Id, TDto> {
		const rawData = this.readRaw();

		if (rawData === null) {
			return {};
		}

		return this.parseSafe(rawData);
	}

	private readRaw(): string | null {
		return this.#storage.getItem(this.#id);
	}

	private parseSafe(payload: string): Record<Id, TDto> | {} {
		try {
			return JSON.parse(payload);
		} catch {
			return {};
		}
	}

	private makeId(id: Id): Id {
		let idPrefix =
			this.options?.prefix ?? LocalStorageCollectionDataSource.#ID_PREFIX;

		return `${idPrefix}/${id}`;
	}
}
