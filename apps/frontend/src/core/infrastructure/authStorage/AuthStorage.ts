import { AppStorage } from '@core/infrastructure/appStorage/AppStorage';
import type { IAuthStorage } from '@core/infrastructure/authStorage/types';

export class AuthStorage extends AppStorage<string> implements IAuthStorage {
	public static readonly STORAGE_ID: string = 'token';
}
