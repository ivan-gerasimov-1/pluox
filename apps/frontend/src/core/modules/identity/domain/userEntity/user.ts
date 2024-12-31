import { Entity } from '@root/core/domain/entity/entity';
import type {
	TUserDTO,
	TUserCreateDTO,
} from '@root/core/modules/identity/application/dto/userDto';
import type { IUser } from '@root/core/modules/identity/domain/userEntity/types';

export class User extends Entity<TUserDTO> implements IUser {
	#email: string;
	#password: string;

	constructor(userCreateDTO: TUserCreateDTO) {
		super(userCreateDTO.id, userCreateDTO.createdAt, userCreateDTO.modifiedAt);

		this.#email = userCreateDTO.email;
		this.#password = userCreateDTO.password;
	}

	public static create(userCreateDTO: TUserCreateDTO): IUser {
		return new User(userCreateDTO);
	}

	public get email(): string {
		return this.#email;
	}

	public get password(): string {
		return this.#password;
	}

	toObject(): TUserDTO {
		return {
			id: this.id,
			email: this.#email,
			password: this.#password,
			createdAt: this.createdAt,
			modifiedAt: this.modifiedAt,
		};
	}
}
