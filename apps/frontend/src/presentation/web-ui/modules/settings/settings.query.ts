import type { Id } from '@root/core/domain/types';
import { resolveService } from '@root/core/infrastructure/serviceContainer/resolveService';
import { EServiceToken } from '@root/core/infrastructure/serviceContainer/types';
import {
	TUserDTO,
	TUserUpdateDTO,
} from '@root/core/modules/user/application/dto/userDTO';

export const QUERY_USER = Symbol('user').description;

export function getUser(): TUserDTO | undefined {
	let sessionService = resolveService(EServiceToken.SESSION_SERVICE);
	let userService = resolveService(EServiceToken.USER_SERVICE);

	let user = userService.getUserById(sessionService.userId) as TUserDTO;

	return user;
}

export function updateUser(userId: Id, userUpdateDTO: TUserUpdateDTO): void {
	let userService = resolveService(EServiceToken.USER_SERVICE);

	userService.updateUser(userId, userUpdateDTO);
}
