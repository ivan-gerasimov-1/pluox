import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: text('id').primaryKey().unique(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	name: text('name'),
	locale: text('locale').notNull(),
	createdAt: text('createdAt').notNull(),
	updatedAt: text('updatedAt').notNull(),
});
