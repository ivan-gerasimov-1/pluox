import { AppConfig } from '@core/infrastructure/appConfig/AppConfig';
import { ELocaleCode } from '@core/infrastructure/intl/enums';
import { create } from 'zustand';

export interface IAppConfigStore {
	readonly locale: ELocaleCode;
	readonly budget: number | null;

	update(config: { locale?: ELocaleCode; budget?: number | null }): void;
}

export const useAppConfigStore = create<IAppConfigStore>((set) => {
	const appConfig = AppConfig.getInstance();

	return {
		locale: appConfig.locale,
		budget: appConfig.budget,

		update(config: { locale?: ELocaleCode; budget?: number | null }): void {
			if (config.locale) {
				appConfig.locale = config.locale;
			}

			if (config.budget !== undefined) {
				appConfig.budget = config.budget;
			}

			set({
				locale: config.locale || appConfig.locale,
				budget: config.budget !== undefined ? config.budget : appConfig.budget,
			});
		},
	};
});
