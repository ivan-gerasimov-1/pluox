import type { IClientId } from '@root/core/modules/identity/domain/clientId/types';
import type { Id } from '@domain/types';
import { ValueObject } from '@root/core/domain/valueObject/valueObject';

export class ClientId extends ValueObject<Id> implements IClientId {}
