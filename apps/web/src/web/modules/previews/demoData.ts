import type { TCategoryDTO } from '@core/modules/category/application/dto/categoryDTO';
import { ECurrency } from '@core/modules/currency/domain/types';
import type { TExpenseDTO } from '@core/modules/expense/application/dto/expenseDTO';
import type { TSessionDTO } from '@core/modules/identity/application/dto/sessionDTO';
import { ELocaleCode } from '@core/modules/intl/domain/enums';
import type { TAppConfig } from '@core/modules/settings/domain/appConfig/types';
import type { TUserDTO } from '@core/modules/user/application/dto/userDTO';
import type { TVenueDTO } from '@core/modules/venue/application/dto/venueDTO';

export const PREVIEW_NAMESPACE = '@pluox-preview-v1';
const USER_ID = 'demo-user';
const MARKER = `${PREVIEW_NAMESPACE}/demo`;

export function initializeDemo(
	storage: Storage,
	enabled: boolean,
	now = new Date(),
) {
	if (!enabled || storage.getItem(MARKER)) return false;
	resetDemo(storage, enabled, now);
	return true;
}

export function resetDemo(
	storage: Storage,
	enabled: boolean,
	now = new Date(),
) {
	if (!enabled) return;
	let data = createDemoData(now);
	let keys = [];
	for (let index = 0; index < storage.length; index++) {
		let key = storage.key(index);
		if (key?.startsWith(`${PREVIEW_NAMESPACE}/`)) keys.push(key);
	}
	for (let key of keys) storage.removeItem(key);
	for (let [collection, entries] of Object.entries(data)) {
		storage.setItem(
			`${PREVIEW_NAMESPACE}/${collection}`,
			JSON.stringify(entries),
		);
	}
	// Set the marker last so an interrupted first seed is retried on reload.
	storage.setItem(MARKER, '1');
}

export function createDemoData(now: Date) {
	let createdAt = now.toISOString();
	let categories: TCategoryDTO[] = [
		{
			id: 'demo-food',
			userId: USER_ID,
			name: 'Еда',
			icon: '🍲',
			weight: 3,
			createdAt,
			modifiedAt: createdAt,
		},
		{
			id: 'demo-coffee',
			userId: USER_ID,
			name: 'Кофе',
			icon: '☕',
			weight: 2,
			createdAt,
			modifiedAt: createdAt,
		},
		{
			id: 'demo-transport',
			userId: USER_ID,
			name: 'Транспорт',
			icon: '🚕',
			weight: 1,
			createdAt,
			modifiedAt: createdAt,
		},
		{
			id: 'demo-subscriptions',
			userId: USER_ID,
			name: 'Подписки',
			icon: '☁️',
			weight: 1,
			createdAt,
			modifiedAt: createdAt,
		},
	];
	let venues: TVenueDTO[] = [
		{
			id: 'demo-market',
			name: 'Демо-маркет',
			categoryId: 'demo-food',
			isArchived: false,
			createdAt,
			modifiedAt: createdAt,
		},
		{
			id: 'demo-cafe',
			name: 'Кофейня у дома',
			categoryId: 'demo-coffee',
			isArchived: false,
			createdAt,
			modifiedAt: createdAt,
		},
	];
	let expenses: TExpenseDTO[] = [
		{
			id: 'demo-expense-1',
			userId: USER_ID,
			amount: 23.5,
			currency: ECurrency.EUR,
			description: 'Продукты на ужин',
			category: 'demo-food',
			venue: 'demo-market',
			date: day(now, 0),
			createdAt,
			modifiedAt: createdAt,
			timezone: 'UTC',
		},
		{
			id: 'demo-expense-2',
			userId: USER_ID,
			amount: 450,
			currency: ECurrency.RSD,
			description: 'Капучино',
			category: 'demo-coffee',
			venue: 'demo-cafe',
			date: day(now, 0),
			createdAt,
			modifiedAt: createdAt,
			timezone: 'UTC',
		},
		{
			id: 'demo-expense-3',
			userId: USER_ID,
			amount: 18,
			currency: ECurrency.GEL,
			description: 'Поездка в центр',
			category: 'demo-transport',
			venue: null,
			date: day(now, 1),
			createdAt,
			modifiedAt: createdAt,
			timezone: 'UTC',
		},
		{
			id: 'demo-expense-4',
			userId: USER_ID,
			amount: 14.99,
			currency: ECurrency.USD,
			description: 'Музыкальная подписка',
			category: 'demo-subscriptions',
			venue: null,
			date: day(now, 3),
			createdAt,
			modifiedAt: createdAt,
			timezone: 'UTC',
		},
		{
			id: 'demo-expense-5',
			userId: USER_ID,
			amount: 12.5,
			currency: ECurrency.EUR,
			description: 'Обед с друзьями',
			category: 'demo-food',
			venue: null,
			date: day(now, 5),
			createdAt,
			modifiedAt: createdAt,
			timezone: 'UTC',
		},
		{
			id: 'demo-expense-6',
			userId: USER_ID,
			amount: 8,
			currency: ECurrency.EUR,
			description: 'Расход прошлого месяца',
			category: 'demo-coffee',
			venue: 'demo-cafe',
			date: new Date(
				now.getFullYear(),
				now.getMonth() - 1,
				15,
				12,
			).toISOString(),
			createdAt,
			modifiedAt: createdAt,
			timezone: 'UTC',
		},
	];
	let session: TSessionDTO = {
		clientId: 'demo-client',
		userId: USER_ID,
		authToken: null,
	};
	let user: TUserDTO = {
		id: USER_ID,
		name: 'Демо-пользователь',
		email: '',
		locale: ELocaleCode.RU_RU,
		createdAt,
		modifiedAt: createdAt,
	};
	let config: TAppConfig = {
		locale: ELocaleCode.RU_RU,
		currency: ECurrency.EUR,
		availabelCurrencies: Object.values(ECurrency),
		budget: 1200,
	};
	return {
		session: { data: session },
		user: { [USER_ID]: user },
		appConfig: { data: config },
		categories: byId(categories),
		venues: byId(venues),
		expenses: byId(expenses),
		// Fixed illustrative rates make screenshots and review reproducible.
		currencyRates: {
			data: { EUR: 0.9, USD: 1, RSD: 105, GEL: 2.7, RUB: 90, THB: 36 },
		},
	};
}

function byId<T extends { id: string }>(items: T[]) {
	return Object.fromEntries(items.map((item) => [item.id, item]));
}

function day(now: Date, daysAgo: number) {
	// Keep current-month examples visible even on the first day of a month.
	return new Date(
		now.getFullYear(),
		now.getMonth(),
		Math.max(1, now.getDate() - daysAgo),
		now.getHours(),
		now.getMinutes(),
	).toISOString();
}
