import type { Id } from '@domain/types';
import type {
	TFindManyOptions,
	TFindManyResult,
} from '@root/core/domain/repository/types';
import type { IDatabaseCollection } from '@root/core/infrastructure/database/types';
import type { IDataSource } from '@root/core/infrastructure/dataSource/types';

export class DataSource<TDto, TFindOptions = {}>
	implements IDataSource<TDto, TFindOptions>
{
	constructor(private readonly collection: IDatabaseCollection) {}

	public upsert(id: Id, dto: TDto): void {
		let hasItem = this.collection.has(id);

		if (hasItem) {
			this.update(id, dto);
		} else {
			this.insert(id, dto);
		}
	}

	public insert(id: Id, dto: TDto, options?: { replace?: boolean }): void {
		let hasItem = this.collection.has(id);

		if (hasItem && !options?.replace) {
			throw new Error(`Item with id "${id}" already exists`);
		}

		this.collection.writeOne(id, dto);
	}

	public update(id: Id, dto: Partial<TDto>): void {
		let hasItem = this.collection.has(id);

		if (!hasItem) {
			throw new Error(`Item with id ${id} not found`);
		}

		this.collection.updateOne(id, dto);
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
		this.collection.clear();
	}
}
