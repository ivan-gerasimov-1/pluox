import type { Id } from '@pluox/core/src/domain/types';
import { ValueObject } from '@pluox/core/src/domain/valueObject/valueObject';

import type { IClientId } from '@pluox/core/src/modules/identity/domain/clientId/types';

export class ClientId extends ValueObject<Id> implements IClientId {}
