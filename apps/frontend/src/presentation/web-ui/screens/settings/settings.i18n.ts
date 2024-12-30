import { ELocaleCode } from '@root/core/modules/intl/domain/enums';

export const settingsI18n = {
	[ELocaleCode.RU_RU]: {
		screenTitle: 'Настройки',
		userSectionTitle: 'Пользователь',
		userName: 'Имя',
		userEmail: 'Почта',

		exitButton: 'Выйти',
		exitConfirmation: 'Вы уверены, что хотите выйти?',

		appSectionTitle: 'Приложение',
		appLanguage: 'Язык',

		currencySectionTitle: 'Валюта',
		currencyMain: 'Основная',
		currencyAvailable: 'Доступные',

		budgetSectionTitle: 'Бюджет',
		/** @deprecated */
		budgetLabel: 'Бюджет',

		categoriesSectionTitle: 'Категории',
		/** @deprecated */
		categoriesLabel: 'Категории',

		save: 'Сохранить',
	},
	[ELocaleCode.EN_US]: {
		screenTitle: 'Settings',
		userSectionTitle: 'User',
		userName: 'Name',
		userEmail: 'Email',

		exitButton: 'Exit',
		exitConfirmation: 'Are you sure?',

		appSectionTitle: 'Application',
		appLanguage: 'Language',

		currencySectionTitle: 'Currency',
		currencyMain: 'Main',
		currencyAvailable: 'Available',

		budgetSectionTitle: 'Budget',
		/** @deprecated */
		budgetLabel: 'Budget',

		categoriesSectionTitle: 'Categories',
		/** @deprecated */
		categoriesLabel: 'Categories',

		save: 'Save',
	},
};
