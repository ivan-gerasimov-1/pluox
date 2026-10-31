import {
	createDemoData,
	initializeDemo,
	PREVIEW_NAMESPACE,
	resetDemo,
} from './demoData';
import { describe, expect, it } from 'vitest';

class MemoryStorage implements Storage {
	private entries = new Map<string, string>();
	failKey: string | null = null;
	get length() {
		return this.entries.size;
	}
	clear() {
		this.entries.clear();
	}
	key(index: number) {
		return Array.from(this.entries.keys())[index] ?? null;
	}
	getItem(key: string) {
		return this.entries.get(key) ?? null;
	}
	removeItem(key: string) {
		this.entries.delete(key);
	}
	setItem(key: string, value: string) {
		if (key === this.failKey) throw new Error('Storage full');
		this.entries.set(key, value);
	}
}

let now = new Date(2026, 9, 31, 12);

describe('preview demo data', () => {
	it('never seeds or resets when preview mode is disabled', () => {
		let storage = new MemoryStorage();
		storage.setItem('@pluox/expenses', 'real data');
		expect(initializeDemo(storage, false, now)).toBe(false);
		resetDemo(storage, false, now);
		expect(storage.length).toBe(1);
		expect(storage.getItem('@pluox/expenses')).toBe('real data');
	});

	it('seeds once and preserves edits across reloads', () => {
		let storage = new MemoryStorage();
		expect(initializeDemo(storage, true, now)).toBe(true);
		storage.setItem(`${PREVIEW_NAMESPACE}/expenses`, 'edited demo');
		expect(initializeDemo(storage, true, new Date(2026, 10, 1))).toBe(false);
		expect(storage.getItem(`${PREVIEW_NAMESPACE}/expenses`)).toBe(
			'edited demo',
		);
	});

	it('reset replaces demo data and preserves all other browser storage', () => {
		let storage = new MemoryStorage();
		storage.setItem('@pluox/expenses', 'existing expenses');
		storage.setItem('another-app', 'existing data');
		storage.setItem(`${PREVIEW_NAMESPACE}/extra`, 'old demo state');
		resetDemo(storage, true, now);
		expect(storage.getItem('@pluox/expenses')).toBe('existing expenses');
		expect(storage.getItem('another-app')).toBe('existing data');
		expect(storage.getItem(`${PREVIEW_NAMESPACE}/extra`)).toBeNull();
		expect(storage.getItem(`${PREVIEW_NAMESPACE}/expenses`)).toBe(
			JSON.stringify(createDemoData(now).expenses),
		);
	});

	it('an interrupted seed is retried instead of accepting partial data', () => {
		let storage = new MemoryStorage();
		storage.failKey = `${PREVIEW_NAMESPACE}/expenses`;
		expect(() => initializeDemo(storage, true, now)).toThrow('Storage full');
		expect(storage.getItem(`${PREVIEW_NAMESPACE}/demo`)).toBeNull();
		storage.failKey = null;
		expect(initializeDemo(storage, true, now)).toBe(true);
	});

	it('has linked categories, venues, a guest session, and multiple currencies', () => {
		let data = createDemoData(now);
		expect(data.session.data.authToken).toBeNull();
		expect(
			Object.values(data.user).find(
				(user) => user.id === data.session.data.userId,
			)?.name,
		).toBeTruthy();
		expect(
			new Set(Object.values(data.expenses).map((expense) => expense.currency))
				.size,
		).toBeGreaterThan(1);
		for (let expense of Object.values(data.expenses)) {
			expect(expense.userId).toBe(data.session.data.userId);
			if (expense.category)
				expect(data.categories[expense.category]).toBeDefined();
			if (expense.venue) expect(data.venues[expense.venue]).toBeDefined();
		}
		expect(data.currencyRates.data.USD).toBe(1);
	});

	it('keeps current-month expenses visible on the first day of January', () => {
		let date = new Date(2026, 0, 1, 12);
		let expenses = Object.values(createDemoData(date).expenses);
		expect(
			expenses.filter((expense) => new Date(expense.date).getMonth() === 0),
		).toHaveLength(5);
		expect(
			expenses.some((expense) => new Date(expense.date).getFullYear() === 2025),
		).toBe(true);
	});
});
