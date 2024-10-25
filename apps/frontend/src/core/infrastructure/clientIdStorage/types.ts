import type { IAppStorage } from '@core/infrastructure/appStorage/types';
import type { Id } from '@domain/types';

export interface IClientIdStorage extends IAppStorage<Id> {}
