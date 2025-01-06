import type { Id } from '@root/core/domain/types';
import type { ValueObject } from '@root/core/domain/valueObject/valueObject';
import type { TSessionDTO } from '@root/core/modules/identity/application/dto/sessionDTO';
import type { IClientId } from '@root/core/modules/identity/domain/clientId/types';

export type TSessionValue = {
	clientId: IClientId;
	userId: Id;
	authToken: string | null;
};

export interface ISession extends ValueObject<TSessionValue> {
	readonly clientId: IClientId;
	readonly userId: Id;
	readonly authToken: string | null;

	setAuthToken(authToken: string | null): void;
}

export interface ISessionFactory {
	create(): ISession;
	create(sessionDTO: TSessionDTO): ISession;
	create(clientId: IClientId, userId: Id, authToken: string | null): ISession;
}
