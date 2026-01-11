import type { Id } from '@root/core/domain/types';
import { ValueObject } from '@root/core/domain/valueObject/valueObject';

import type { IClientId } from '@root/core/modules/identity/domain/clientId/types';

export class ClientId extends ValueObject<Id> implements IClientId {}
