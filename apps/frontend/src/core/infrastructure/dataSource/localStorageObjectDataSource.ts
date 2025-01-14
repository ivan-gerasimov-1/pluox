import type { Id } from '@domain/types';
import type { TFindManyResult } from '@root/core/domain/repository/types';
import type { IDataSource } from '@root/core/infrastructure/dataSource/types';

import { deepMerge } from '@root/core/infrastructure/dataSource/deepMerge';
import { parseSafeToNull } from '@root/core/infrastructure/dataSource/parseSafe';

export class LocalStorageObjectDataSource<TDto extends {}>
	implements IDataSource<TDto>
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

	public drop(): void {
		this.clearStorage();
	}

	public findOne(): TDto | null {
		return this.readFromStorage();
	}

	public findMany(): TFindManyResult<TDto> {
		throw new Error('Not allowed in LocalStorageObjectDataSource');
	}

	protected readFromStorage(): TDto | null {
		const rawData = this.#storage.getItem(this.#id);

		if (rawData === null) {
			return null;
		}

		return parseSafeToNull<TDto>(rawData);
	}

	private writeToStorage<T>(data: T): void {
		this.#storage.setItem(this.#id, JSON.stringify(data));
	}

	private clearStorage(): void {
		this.#storage.removeItem(this.#id);
	}

	private makeId(id: Id): Id {
		let idPrefix =
			this.options?.prefix ?? LocalStorageObjectDataSource.#ID_PREFIX;

		return `${idPrefix}/${id}`;
	}
}
