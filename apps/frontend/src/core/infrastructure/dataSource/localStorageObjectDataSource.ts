import type { Id } from '@domain/types';
import type { TFindManyResult } from '@root/core/domain/repository/types';
import type { IDataSource } from '@root/core/infrastructure/dataSource/types';

import { STORAGE_NAMESPACE } from '@root/core/modules/settings/infrastructure/environment/constants';
import { deepMerge } from '@root/core/infrastructure/dataSource/deepMerge';
import { parseSafeToNull } from '@root/core/infrastructure/dataSource/parseSafe';

export class LocalStorageObjectDataSource<TDto extends {}>
	implements IDataSource<TDto>
{
	readonly #id: Id;

	constructor(
		private readonly storage: typeof window.localStorage,
		options: {
			id: Id;
			prefix?: string;
		},
	) {
		this.#id = this.makeId(options.id, options.prefix ?? STORAGE_NAMESPACE);
	}

	public upsert(dto: TDto): void {
		let data = this.readFromStorage();

		if (data) {
			this.update(dto);
		} else {
			this.insert(dto);
		}
	}

	public insert(dto: TDto): void {
		let prevData = this.readFromStorage();

		if (prevData) {
			throw new Error(`Item already exists`);
		}

		this.writeToStorage(dto);
	}

	public update(dto: Partial<TDto>): void {
		let prevData = this.readFromStorage();

		if (!prevData) {
			throw new Error(`Item not found`);
		}

		let data = deepMerge(prevData, dto);

		this.writeToStorage(data);
	}

	public remove(id: Id): void {
		throw new Error('Not allowed in LocalStorageObjectDataSource');
	}

	public clear(): void {
		this.clearStorage();
	}

	public findOne(): TDto | null {
		return this.readFromStorage();
	}

	public findMany(): TFindManyResult<TDto> {
		throw new Error('Not allowed in LocalStorageObjectDataSource');
	}

	public findAll(): TDto[] {
		throw new Error('Not allowed in LocalStorageObjectDataSource');
	}

	protected readFromStorage(): TDto | null {
		const rawData = this.storage.getItem(this.#id);

		if (rawData === null) {
			return null;
		}

		return parseSafeToNull<TDto>(rawData);
	}

	private writeToStorage<T>(data: T): void {
		this.storage.setItem(this.#id, JSON.stringify(data));
	}

	private clearStorage(): void {
		this.storage.removeItem(this.#id);
	}

	private makeId(id: Id, prefix: string): Id {
		return `${prefix}/${id}`;
	}
}
