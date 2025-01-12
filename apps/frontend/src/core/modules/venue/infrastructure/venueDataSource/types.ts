import type {
	TFindManyOptions,
	TFindManyResult,
} from '@root/core/domain/repository/types';
import type { Id } from '@root/core/domain/types';
import type { IDataSource } from '@root/core/infrastructure/dataSource/types';
import type { TVenueDTO } from '@root/core/modules/venue/application/dto/venueDTO';
import type { TVenueFindOptions } from '@root/core/modules/venue/domain/venueRepository/types';

export interface IVenueDataSource extends IDataSource<Record<Id, TVenueDTO>> {
	save(venueDTO: TVenueDTO): TVenueDTO;

	findMany(
		options?: TFindManyOptions<TVenueFindOptions>,
	): TFindManyResult<TVenueDTO>;
	findById(id: Id): TVenueDTO | null;
}
