import type { Id } from '@root/core/domain/types';
import type { ValueObject } from '@root/core/domain/valueObject/valueObject';
import type { IClientId } from '@root/core/modules/identity/domain/clientId/types';

export type TSessionValue = {
	clientId: IClientId;
	userId: Id;
};

export interface ISession extends ValueObject<TSessionValue> {
	readonly clientId: IClientId;
	readonly userId: Id;
}
