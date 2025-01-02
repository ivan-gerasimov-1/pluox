/**
 * @todo
 * 1. Move UserFactory to DI
 * 2. Implement UserRepository and store multiple users
 */
import type { TUserCreateDTO } from '@root/core/modules/identity/application/dto/userDTO';
import type { IUserService } from '@root/core/modules/identity/application/userService/types';
import type { IUser } from '@root/core/modules/identity/domain/userEntity/types';
import { User } from '@root/core/modules/identity/domain/userEntity/user';

export interface IUserFactory {
	create(userCreateDTO: TUserCreateDTO): IUser;
}

/** @todo №1 */
export class UserFactory implements IUserFactory {
	public create(userCreateDTO: TUserCreateDTO): IUser {
		return new User(userCreateDTO);
	}
}

export class UserService implements IUserService {
	#userFactory: IUserFactory;

	constructor() {
		this.#userFactory = new UserFactory();
	}

	public createUser(userCreateDTO: TUserCreateDTO): IUser {
		return this.#userFactory.create(userCreateDTO);
	}
}
