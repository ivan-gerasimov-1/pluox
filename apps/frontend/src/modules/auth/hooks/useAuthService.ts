import { AuthService } from '@core/infrastructure/authService/AuthService';
import type { IAuthSerivce } from '@core/infrastructure/authService/types';

export function useAuthService(): IAuthSerivce {
	return AuthService.getInstance();
}
