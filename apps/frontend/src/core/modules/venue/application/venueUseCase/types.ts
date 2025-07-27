import type { Id, IUseCase } from '@root/core/domain/types';
import type {
	TVenueCreateDTO,
	TVenueDTO,
} from '@root/core/modules/venue/application/dto/venueDTO';

export interface IVenueUseCase {
	create(venueCreateDTO: TVenueCreateDTO): TVenueDTO;
	remove(id: Id): void;
	archive(id: Id): void;
	unarchive(id: Id): void;
}

export interface IVenueCreateUseCase extends IUseCase {
	execute(venueCreateDTO: TVenueCreateDTO): TVenueDTO;
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
