import type { TAuthTokenDTO } from '@pluox/core/src/modules/identity/application/dto/authTokenDTO';

export type TSessionDTO = {
	clientId: string;
	userId: string;
	authToken: TAuthTokenDTO | null;
};
