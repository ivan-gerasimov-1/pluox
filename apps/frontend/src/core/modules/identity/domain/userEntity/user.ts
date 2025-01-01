import { Entity } from '@root/core/domain/entity/entity';
import type {
	TUserDTO,
	TUserCreateDTO,
} from '@root/core/modules/identity/application/dto/userDTO';
import type { IUser } from '@root/core/modules/identity/domain/userEntity/types';

export class User extends Entity<TUserDTO> implements IUser {
	#email: string;
	#name: string;

	constructor(userCreateDTO: TUserCreateDTO) {
		super(userCreateDTO.id, userCreateDTO.createdAt, userCreateDTO.modifiedAt);

		this.#email = userCreateDTO.email;
		this.#name = userCreateDTO.name;
	}

	public static create(userCreateDTO: TUserCreateDTO): IUser {
		return new User(userCreateDTO);
	}

	public get email(): string {
		return this.#email;
	}

	public get name(): string {
		return this.#name;
	}

	toDTO(): TUserDTO {
		return {
			id: this.id,
			email: this.#email,
			name: this.#name,
			createdAt: this.createdAt,
			modifiedAt: this.modifiedAt,
		};
	}
}
