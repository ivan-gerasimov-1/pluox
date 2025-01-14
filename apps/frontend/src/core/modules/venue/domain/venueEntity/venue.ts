import { Entity } from '@root/core/domain/entity/entity';
import type { TISODateString } from '@root/core/domain/temporal/types';
import type { Id } from '@root/core/domain/types';
import type { IVenue } from '@root/core/modules/venue/domain/venueEntity/types';

export class Venue extends Entity implements IVenue {
	#name: string;
	#categoryId: Id;

	constructor(
		id: Id,
		name: string,
		categoryId: Id,
		createdAt: TISODateString,
		modifiedAt?: TISODateString,
	) {
		super(id, createdAt, modifiedAt);

		this.#name = name;
		this.#categoryId = categoryId;
	}

	public get name(): string {
		return this.#name;
	}

	public set name(name: string) {
		this.#name = name;

		this.touch();
	}

	public get categoryId(): Id {
		return this.#categoryId;
	}

	public set categoryId(categoryId: Id) {
		this.#categoryId = categoryId;

		this.touch();
	}
}
