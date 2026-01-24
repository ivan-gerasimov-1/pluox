import type { Id } from '@core/domain/types';

import type {
	TVenueCreateDTO,
	TVenueDTO,
	TVenueUpdateDTO,
} from '@core/modules/venue/application/dto/venueDTO';
import type {
	IVenueArchiveUseCase,
	IVenueCreateUseCase,
	IVenueDeleteUseCase,
	IVenueUnarchiveUseCase,
	IVenueUpdateUseCase,
	IVenueUseCase,
} from '@core/modules/venue/application/venueUseCase/types';

export class VenueUseCase implements IVenueUseCase {
	constructor(
		private readonly venueCreateUseCase: IVenueCreateUseCase,
		private readonly venueUpdateUseCase: IVenueUpdateUseCase,
		private readonly venueDeleteUseCase: IVenueDeleteUseCase,
		private readonly venueArchiveUseCase: IVenueArchiveUseCase,
		private readonly venueUnarchiveUseCase: IVenueUnarchiveUseCase,
	) {}

	public create(venueCreateDTO: TVenueCreateDTO): TVenueDTO {
		return this.venueCreateUseCase.execute(venueCreateDTO);
	}

	public update(id: Id, updateDto: TVenueUpdateDTO): TVenueDTO {
		return this.venueUpdateUseCase.execute(id, updateDto);
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
