import type { IDataSource } from '@core/infrastructure/appStorage/types';
import type { Id } from '@domain/types';

export interface IClientIdStorage extends IDataSource<Id> {}
