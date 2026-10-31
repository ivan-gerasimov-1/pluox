import { ELocaleCode } from '@core/modules/intl/domain/enums';

export const previewControlsI18n = {
	[ELocaleCode.RU_RU]: {
		label: 'Preview · демоданные',
		description: 'Тестовые расходы и примерные курсы валют.',
		reset: 'Сбросить демо',
		confirm:
			'Вернуть исходные демоданные? Изменения в этом preview будут удалены.',
		error:
			'Не удалось сбросить демоданные. Проверьте доступное место в хранилище браузера.',
	},
	[ELocaleCode.EN_US]: {
		label: 'Preview · demo data',
		description: 'Sample expenses and illustrative exchange rates.',
		reset: 'Reset demo',
		confirm: 'Restore the demo data? Changes in this preview will be removed.',
		error: 'Could not reset the demo. Check available browser storage.',
	},
};
