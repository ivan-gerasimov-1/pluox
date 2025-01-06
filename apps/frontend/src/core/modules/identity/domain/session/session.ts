import type { Id } from '@root/core/domain/types';
import { ValueObject } from '@root/core/domain/valueObject/valueObject';
import type { IClientId } from '@root/core/modules/identity/domain/clientId/types';
import type {
	ISession,
	TSessionValue,
} from '@root/core/modules/identity/domain/session/types';

export class Session extends ValueObject<TSessionValue> implements ISession {
	constructor(clientId: IClientId, userId: Id, authToken: string | null) {
		super({
			clientId,
			userId,
			authToken,
		});
	}

	public get clientId(): IClientId {
		return this.value.clientId;
	}

	public get userId(): Id {
		return this.value.userId;
	}

	public get authToken(): string | null {
		return this.value.authToken;
	}

	public override equals(other: ISession): boolean {
		return this.clientId.equals(other.clientId) && this.userId === other.userId;
	}
}
