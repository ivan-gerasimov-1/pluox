import type { Id } from '@pluox/core/src/domain/types';
import type { ValueObject } from '@pluox/core/src/domain/valueObject/valueObject';

import type { TSessionDTO } from '@pluox/core/src/modules/identity/application/dto/sessionDTO';
import type { IAuthToken } from '@pluox/core/src/modules/identity/domain/authToken/types';
import type { IClientId } from '@pluox/core/src/modules/identity/domain/clientId/types';

export type TSessionValue = {
	clientId: IClientId;
	userId: Id;
	authToken: IAuthToken | null;
};

export interface ISession extends ValueObject<TSessionValue> {
	readonly clientId: IClientId;
	readonly userId: Id;
	readonly authToken: IAuthToken | null;

	setAccessToken(accessToken: string | null): void;
}

export interface ISessionFactory {
	create(): ISession;
	create(sessionDTO: TSessionDTO): ISession;
	create(
		clientId: IClientId,
		userId: Id,
		authToken: IAuthToken | null,
	): ISession;
}
