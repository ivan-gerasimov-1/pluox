import {
	TUserCreateDTO,
	TUserDTO,
} from '@root/core/modules/identity/application/dto/userDTO';
import { IUser } from '@root/core/modules/identity/domain/userEntity/types';

export interface IUserService {
	createUser(payload: TUserCreateDTO): IUser;
	getMainUser(): TUserDTO | null;
}
