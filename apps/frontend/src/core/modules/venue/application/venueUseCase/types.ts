import type { IUseCase } from '@root/core/domain/types';
import type { TVenueCreateDTO } from '@root/core/modules/venue/application/dto/venueDTO';

export interface IVenueUseCase {
	create(venueCreateDTO: TVenueCreateDTO): void;
}

export interface IVenueCreateUseCase extends IUseCase {
	execute(venueCreateDTO: TVenueCreateDTO): void;
}
