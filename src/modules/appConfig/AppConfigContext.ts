import { type IAppConfig } from '@core/infrastructure/appConfig/AppConfig';
import { createContext } from 'react';

export const AppConfigContext = createContext<IAppConfig | null>(null);
