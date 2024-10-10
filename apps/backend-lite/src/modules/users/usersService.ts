import type { TUserSchema } from '#app/modules/users/types';
import type { TId } from '#app/types';
import type { Database } from 'better-sqlite3';

const enum EUsersSQLQuery {
	ONE_BY_ID = 'SELECT id, email FROM users WHERE id = ?',
	ALL = 'SELECT id, email FROM users',
}

export class UsersService {
	#database: Database;

	constructor(database: Database) {
		this.#database = database;
	}

	public async getUser(
		id: string,
	): Promise<Pick<TUserSchema, 'id' | 'email'> | null> {
		let user = this.#userFindByIdStatement.get(id);

		return user
			? {
					id: user.id,
					email: user.email,
				}
			: null;
	}

	public async getUsers(): Promise<Pick<TUserSchema, 'id' | 'email'>[]> {
		let users = this.#usersFindAllStatement.all();

		return users.map((user) => {
			return {
				id: user.id,
				email: user.email,
			};
		});
	}

	get #userReadSQLQuery(): string {
		return EUsersSQLQuery.ONE_BY_ID;
	}

	get #usersReadSQLQuery(): string {
		return EUsersSQLQuery.ALL;
	}

	get #userFindByIdStatement() {
		return this.#database.prepare<[TId], Pick<TUserSchema, 'id' | 'email'>>(
			this.#userReadSQLQuery,
		);
	}

	get #usersFindAllStatement() {
		return this.#database.prepare<[], Pick<TUserSchema, 'id' | 'email'>>(
			this.#usersReadSQLQuery,
		);
	}
}
