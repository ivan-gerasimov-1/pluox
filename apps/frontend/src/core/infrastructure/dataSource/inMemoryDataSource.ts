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

export class InMemoryDataSource<TDto extends TDtoWithId, TFindOptions>
	implements IDataSource<TDto, TFindOptions>
{
	readonly #storage: Map<Id, TDto>;

	constructor() {
		this.#storage = new Map<Id, TDto>();
	}

	protected get storage(): Map<Id, TDto> {
		return this.#storage;
	}

	public upsert(dto: TDto): void {
		if (this.#storage.has(dto.id)) {
			this.update(dto);
		} else {
			this.insert(dto);
		}
	}

	public insert(createDTO: TDto): TDto {
		if (this.#storage.has(createDTO.id)) {
			throw new Error(`Category with id ${createDTO.id} already exists`);
		}

		this.#storage.set(createDTO.id, createDTO);

		return createDTO;
	}

	public update(updateDTO: { id: Id } & Partial<TDto>): TDto {
		let dto = this.#storage.get(updateDTO.id);

		if (!dto) {
			throw new Error(`Category with id ${updateDTO.id} not found`);
		}

		this.#storage.set(updateDTO.id, deepMerge(dto, updateDTO));

		return this.#storage.get(updateDTO.id) as TDto;
	}

	public findOne(query?: { id?: Id }): TDto | null {
		if (query?.id) {
			return this.#storage.get(query.id) ?? null;
		}

		return [...this.#storage.values()][0] ?? null;
	}

	public findMany(
		options?: TFindManyOptions<TFindOptions>,
	): TFindManyResult<TDto> {
		let items: TDto[] = [...this.#storage.values()];

		if (options?.limit) {
			items = items.slice(0, options.limit);
		}

		return {
			items: items,
			total: items.length,
		};
	}

	public remove(id: Id): TDto | null {
		let category = this.#storage.get(id);

		if (!category) {
			return null;
		}

		this.#storage.delete(id);

		return category;
	}

	public drop(): void {
		this.#storage.clear();
	}
}
