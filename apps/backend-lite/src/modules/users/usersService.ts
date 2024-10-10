import type { TUserSchema } from '#app/modules/users/types';
import type { TId } from '#app/types';
import type { Database } from 'better-sqlite3';

export class UsersService {
	#db: Database;

	constructor(database: Database) {
		this.#db = database;
	}

	public async getUser(
		id: string,
	): Promise<Pick<TUserSchema, 'id' | 'email'> | null> {
		let userReadSQLQuery = 'SELECT id, email FROM users WHERE id = ?';
		let userReadStatement = this.#db.prepare<
			[TId],
			Pick<TUserSchema, 'id' | 'email'>
		>(userReadSQLQuery);

		let user = userReadStatement.get(id);

		return user
			? {
					id: user.id,
					email: user.email,
				}
			: null;
	}

	public async getUsers(): Promise<Pick<TUserSchema, 'id' | 'email'>[] | null> {
		let usersSqlQuery = `
		SELECT id, email FROM users
	`;
		let usersSqlStatement = this.#db.prepare<
			[],
			{
				id: string;
				email: string;
			}
		>(usersSqlQuery);

		let users = usersSqlStatement.all();

		return users ?? null;
	}
}
