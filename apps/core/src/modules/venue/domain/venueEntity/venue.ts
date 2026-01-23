import { Entity } from '@pluox/core/src/domain/entity/entity';
import type { TISODateString } from '@pluox/core/src/domain/temporal/types';
import type { Id } from '@pluox/core/src/domain/types';

import type { IVenue } from '@pluox/core/src/modules/venue/domain/venueEntity/types';

export class Venue extends Entity implements IVenue {
	#name: string;
	#categoryId: Id;
	#isArchived: boolean;

	constructor(
		id: Id,
		name: string,
		categoryId: Id,
		isArchived: boolean,
		createdAt: TISODateString,
		modifiedAt?: TISODateString,
	) {
		super(id, createdAt, modifiedAt);

		this.#name = name;
		this.#categoryId = categoryId;
		this.#isArchived = isArchived;
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

	public set isArchived(isArchived: boolean) {
		this.#isArchived = isArchived;

		this.touch();
	}

	public get isArchived(): boolean {
		return this.#isArchived;
	}
}
