import { deepMerge } from '@root/core/infrastructure/dataSource/deepMerge';

import type {
	TFindManyOptions,
	TFindManyResult,
} from '@root/core/domain/repository/types';
import type { Id } from '@root/core/domain/types';
import type {
	IDataSource,
	TDtoWithId,
} from '@root/core/infrastructure/dataSource/types';

/** @deprecated */
export class InMemoryDataSource<TDto extends TDtoWithId, TFindOptions>
	implements IDataSource<TDto, TFindOptions>
{
	readonly #storage: Map<Id, TDto>;

	constructor() {
		this.#storage = new Map<Id, TDto>();
	}

	public upsert(dto: TDto): void {
		if (this.isItemInStorage(dto.id)) {
			this.update(dto);
		} else {
			this.insert(dto);
		}
	}

	public insert(createDTO: TDto): TDto {
		if (this.isItemInStorage(createDTO.id)) {
			throw new Error(`Category with id ${createDTO.id} already exists`);
		}

		this.writeItemToStorage(createDTO);

		return createDTO;
	}

	public update(updateDTO: { id: Id } & Partial<TDto>): TDto {
		let dto = this.readItemFromStorage(updateDTO.id);

		if (!dto) {
			throw new Error(`Category with id ${updateDTO.id} not found`);
		}

		this.writeItemToStorage(deepMerge(dto, updateDTO));

		return this.readItemFromStorage(updateDTO.id) as TDto;
	}

	public findOne(query?: { id?: Id }): TDto | null {
		if (query?.id) {
			return this.readItemFromStorage(query.id);
		}

		return this.readItemsFromStorage()[0] ?? null;
	}

	public findMany(
		options?: TFindManyOptions<TFindOptions>,
	): TFindManyResult<TDto> {
		let items: TDto[] = this.readItemsFromStorage();

		if (options?.limit) {
			items = items.slice(0, options.limit);
		}

		return {
			items: items,
			total: items.length,
		};
	}

	public findAll(): TDto[] {
		return this.readItemsFromStorage();
	}

	public remove(id: Id): TDto | null {
		let category = this.readItemFromStorage(id);

		if (!category) {
			return null;
		}

		this.deleteItemFromStorage(id);

		return category;
	}

	public clear(): void {
		this.clearStorage();
	}

	protected readItemsFromStorage(): TDto[] {
		return [...this.#storage.values()];
	}

	private isItemInStorage(id: Id): boolean {
		return this.#storage.has(id);
	}

	private readItemFromStorage(id: Id): TDto | null {
		return this.#storage.get(id) ?? null;
	}

	private writeItemToStorage(data: TDto): void {
		this.#storage.set(data.id, data);
	}

	private deleteItemFromStorage(id: Id): void {
		this.#storage.delete(id);
	}

	private clearStorage(): void {
		this.#storage.clear();
	}
}
