import type { Id } from '@/core/domain/types';
import { ValueObject } from '@/core/domain/valueObject/valueObject';

import type { IAuthToken } from '@/core/modules/identity/domain/authToken/types';
import type { IClientId } from '@/core/modules/identity/domain/clientId/types';
import type {
	ISession,
	TSessionValue,
} from '@/core/modules/identity/domain/session/types';

export class Session extends ValueObject<TSessionValue> implements ISession {
	constructor(clientId: IClientId, userId: Id, authToken: IAuthToken | null) {
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

	public get authToken(): IAuthToken | null {
		return this.value.authToken;
	}

	public setAccessToken(accessToken: string | null): void {
		this.value.authToken?.setAccessToken(accessToken);
	}

	public override equals(other: ISession): boolean {
		return this.clientId.equals(other.clientId) && this.userId === other.userId;
	}
}
