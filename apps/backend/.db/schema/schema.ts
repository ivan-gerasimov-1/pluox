import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: text('id').primaryKey(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	name: text('name'),
	locale: text('locale'),
	createdAt: text('createdAt').notNull(),
	modifiedAt: text('modifiedAt').notNull(),
});
