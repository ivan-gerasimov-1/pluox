import type { Id } from '@core/domain/types';
import { ValueObject } from '@core/domain/valueObject/valueObject';
import type { IClientId } from '@core/modules/identity/domain/clientId/types';

export class ClientId extends ValueObject<Id> implements IClientId {}
