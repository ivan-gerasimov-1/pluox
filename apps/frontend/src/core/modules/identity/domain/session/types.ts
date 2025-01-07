import type { Id } from '@root/core/domain/types';
import type { ValueObject } from '@root/core/domain/valueObject/valueObject';
import type { TSessionDTO } from '@root/core/modules/identity/application/dto/sessionDTO';
import type { IAuthToken } from '@root/core/modules/identity/domain/authToken/types';
import type { IClientId } from '@root/core/modules/identity/domain/clientId/types';

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
