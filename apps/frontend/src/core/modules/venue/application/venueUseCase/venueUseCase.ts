import type { Id } from '@root/core/domain/types';
import type {
	TVenueCreateDTO,
	TVenueDTO,
} from '@root/core/modules/venue/application/dto/venueDTO';
import type {
	IVenueArchiveUseCase,
	IVenueCreateUseCase,
	IVenueDeleteUseCase,
	IVenueUnarchiveUseCase,
	IVenueUseCase,
} from '@root/core/modules/venue/application/venueUseCase/types';

export class VenueUseCase implements IVenueUseCase {
	constructor(
		private readonly venueCreateUseCase: IVenueCreateUseCase,
		private readonly venueDeleteUseCase: IVenueDeleteUseCase,
		private readonly venueArchiveUseCase: IVenueArchiveUseCase,
		private readonly venueUnarchiveUseCase: IVenueUnarchiveUseCase,
	) {}

	public create(venueCreateDTO: TVenueCreateDTO): TVenueDTO {
		return this.venueCreateUseCase.execute(venueCreateDTO);
	}

	public remove(id: Id): void {
		this.venueDeleteUseCase.execute(id);
	}

	public archive(id: Id): void {
		this.venueArchiveUseCase.execute(id);
	}

	public unarchive(id: Id): void {
		this.venueUnarchiveUseCase.execute(id);
	}
}
