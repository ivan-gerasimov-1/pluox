import type { Id } from '@domain/types';
import type { TFindManyResult } from '@root/core/domain/repository/types';
import type { IDataSource } from '@root/core/infrastructure/dataSource/types';
import type { IStorage } from '@root/core/infrastructure/database/types';

import { deepMerge } from '@root/core/infrastructure/dataSource/deepMerge';
import { parseSafeToNull } from '@root/core/infrastructure/dataSource/parseSafe';

export class ObjectDataSource<TDto> implements IDataSource<TDto, {}> {
	private readonly id: Id;

	constructor(
		private readonly storage: IStorage,
		options: {
			id: Id;
			namespace: string;
		},
	) {
		this.id = this.makeId(options.id, options.namespace);
	}

	public upsert(id: Id, dto: TDto): void {
		let data = this.readData();

		if (data) {
			this.update(id, dto);
		} else {
			this.insert(id, dto);
		}
	}

	public insert(id: Id, dto: TDto): void {
		let prevData = this.readData();

		if (prevData) {
			throw new Error(`Item already exists`);
		}

		this.writeData(dto);
	}

	public update(id: Id, dto: Partial<TDto>): void {
		let prevData = this.readData();

		if (!prevData) {
			throw new Error(`Item not found`);
		}

		let data = deepMerge(prevData, dto);

		this.writeData(data);
	}

	public remove(id: Id): void {
		this.clear();
	}

	public findOne(): TDto | null {
		return this.readData();
	}

	public findMany(): TFindManyResult<TDto> {
		let data = this.readData();

		return {
			items: data ? [data] : [],
			total: data ? 1 : 0,
		};
	}

	public findAll(): TDto[] {
		let data = this.readData();

		return data ? [data] : [];
	}

	public clear(): void {
		this.clearData();
	}

	protected readData(): TDto | null {
		const rawData = this.storage.getItem(this.id);

		if (rawData === null) {
			return null;
		}

		return parseSafeToNull<TDto>(rawData);
	}

	private writeData<T>(data: T): void {
		this.storage.setItem(this.id, JSON.stringify(data));
	}

	private clearData(): void {
		this.storage.removeItem(this.id);
	}

	private makeId(id: Id, prefix: string): Id {
		return `${prefix}/${id}`;
	}
}
