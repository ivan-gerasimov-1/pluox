/**
 * @todo Move UserFactory to DI
 */
import type { TUserCreateDTO } from '@root/core/modules/identity/application/dto/userDTO';
import type { IUserService } from '@root/core/modules/identity/application/userService/types';
import type { IUser } from '@root/core/modules/identity/domain/userEntity/types';
import { User } from '@root/core/modules/identity/domain/userEntity/user';

export interface IUserFactory {
	create(userCreateDTO: TUserCreateDTO): IUser;
}

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
