import { type IAppConfig } from '@core/infrastructure/appConfig/AppConfig';
import { AppConfigContext } from '@modules/appConfig/AppConfigContext';
import { ReactContextNotInitializedError } from '@modules/errors/_reactContextNotInitializedError';
import { useContext } from 'react';

export function useAppConfig(): IAppConfig {
	const appConfig = useContext(AppConfigContext);

	if (!appConfig) {
		throw new ReactContextNotInitializedError('AppConfigContext');
	}

	return appConfig;
}
