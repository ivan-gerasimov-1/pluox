import type { TVenueCreateDTO } from '@root/core/modules/venue/application/dto/venueDTO';
import type {
	IVenueCreateUseCase,
	IVenueDeleteUseCase,
	IVenueUseCase,
} from '@root/core/modules/venue/application/venueUseCase/types';

export class VenueUseCase implements IVenueUseCase {
	constructor(
		private readonly venueCreateUseCase: IVenueCreateUseCase,
		private readonly venueDeleteUseCase: IVenueDeleteUseCase,
	) {}

	public create(venueCreateDTO: TVenueCreateDTO): void {
		this.venueCreateUseCase.execute(venueCreateDTO);
	}

	public remove(id: string): void {
		this.venueDeleteUseCase.execute(id);
	}
}
