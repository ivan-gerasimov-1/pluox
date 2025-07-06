import type { Id, IUseCase } from '@root/core/domain/types';
import type { TVenueCreateDTO } from '@root/core/modules/venue/application/dto/venueDTO';

export interface IVenueUseCase {
	create(venueCreateDTO: TVenueCreateDTO): void;
	remove(id: Id): void;
}

export interface IVenueCreateUseCase extends IUseCase {
	execute(venueCreateDTO: TVenueCreateDTO): void;
}

export interface IVenueDeleteUseCase extends IUseCase {
	execute(id: Id): void;
}

export interface IVenueArchiveUseCase extends IUseCase {
	execute(id: Id): void;
}
