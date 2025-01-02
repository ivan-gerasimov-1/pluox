import type { IClientId } from '@root/core/modules/identity/domain/clientId/types';

export interface IClientIdService {
	createClientId(): IClientId;
}
