import type { Id, IUseCase } from '@pluox/core/src/domain/types';

import type {
	TVenueCreateDTO,
	TVenueDTO,
	TVenueUpdateDTO,
} from '@pluox/core/src/modules/venue/application/dto/venueDTO';

export interface IVenueUseCase {
	create(venueCreateDTO: TVenueCreateDTO): TVenueDTO;
	update(id: Id, updateDto: TVenueUpdateDTO): TVenueDTO;
	remove(id: Id): void;
	archive(id: Id): void;
	unarchive(id: Id): void;
}

export interface IVenueCreateUseCase extends IUseCase {
	execute(venueCreateDTO: TVenueCreateDTO): TVenueDTO;
}

export interface IVenueUpdateUseCase extends IUseCase {
	execute(id: Id, updateDto: TVenueUpdateDTO): TVenueDTO;
}

export interface IVenueDeleteUseCase extends IUseCase {
	execute(id: Id): void;
}

export interface IVenueArchiveUseCase extends IUseCase {
	execute(id: Id): void;
}

export interface IVenueUnarchiveUseCase extends IUseCase {
	execute(id: Id): void;
}
