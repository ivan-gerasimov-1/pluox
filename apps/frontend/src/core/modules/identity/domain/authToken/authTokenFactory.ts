import type { TAuthTokenDTO } from '@/core/modules/identity/application/dto/authTokenDTO';
import { AuthToken } from '@/core/modules/identity/domain/authToken/authToken';
import type {
	IAuthToken,
	IAuthTokenFactory,
} from '@/core/modules/identity/domain/authToken/types';

export class AuthTokenFactory implements IAuthTokenFactory {
	public create(authTokenDTO: TAuthTokenDTO): IAuthToken {
		return new AuthToken(authTokenDTO.userId, authTokenDTO.accessToken);
	}
}
