import {
	TFindManyOptions,
	TFindManyResult,
} from '@root/core/domain/repository/types';
import { Id } from '@root/core/domain/types';
import { LocalStorageDataSource } from '@root/core/infrastructure/dataSource/dataSource';
import type { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';
import { TVenueFindOptions } from '@root/core/modules/venue/domain/venueRepository/types';
import type { IVenueDataSource } from '@root/core/modules/venue/infrastructure/venueDataSource/types';

export class VenueLocalStorageDataSource
	extends LocalStorageDataSource<Record<Id, TVenueDTO>>
	implements IVenueDataSource
{
	static readonly #STORAGE_ID = 'venues';

	constructor() {
		super(VenueLocalStorageDataSource.#STORAGE_ID);
	}

	public save(venueDTO: TVenueDTO): TVenueDTO {
		this.update({
			[venueDTO.id]: venueDTO,
		});

		return venueDTO;
	}

	public findMany(
		options?: TFindManyOptions<TVenueFindOptions>,
	): TFindManyResult<TVenueDTO> {
		let venues = this.read();

		if (venues === null) {
			return {
				items: [],
				total: 0,
			};
		}

		let venueList = Object.values(venues);

		return {
			items: venueList,
			total: venueList.length,
		};
	}

	public findById(id: Id): TVenueDTO | null {
		let venues = this.read();

		if (venues === null) {
			return null;
		}

		return venues[id] ?? null;
	}
}
