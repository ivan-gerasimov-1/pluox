import type { TVenueCreateDTO } from '@root/core/modules/venue/application/dto/venueDTO';
import type {
	IVenueCreateUseCase,
	IVenueUseCase,
} from '@root/core/modules/venue/application/venueUseCase/types';

export class VenueUseCase implements IVenueUseCase {
	constructor(private readonly venueCreateUseCase: IVenueCreateUseCase) {}

	create(venueCreateDTO: TVenueCreateDTO): void {
		this.venueCreateUseCase.execute(venueCreateDTO);
	}
}
