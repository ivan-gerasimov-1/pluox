import type { TUserCreateSchema, TUserSchema } from '#app/modules/users/types';
import type { TId } from '#app/types';
import type { Database } from 'better-sqlite3';

const enum EUsersSQLQuery {
	CREATE = 'INSERT INTO users (id, email, password) VALUES (:id, :email, :password)',
	ONE_BY_ID = 'SELECT id, email FROM users WHERE id = ?',
	ONE_BY_EMAIL = 'SELECT id, email, password FROM users WHERE email = ?',
	ALL = 'SELECT id, email FROM users',
}

export class UsersRepository {
	readonly #database: Database;

	constructor(database: Database) {
		this.#database = database;
	}

	public async createUser(user: TUserCreateSchema): Promise<void> {
		this.#userCreateStatement.run(user);
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

	public async getUserByEmail(email: string): Promise<TUserSchema | null> {
		let user = this.#userFindByEmailStatement.get(email);

		return user
			? {
					id: user.id,
					email: user.email,
					password: user.password,
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

	get #userCreateSQLQuery(): string {
		return EUsersSQLQuery.CREATE;
	}

	get #userReadSQLQuery(): string {
		return EUsersSQLQuery.ONE_BY_ID;
	}

	get #userReadByEmailSQLQuery(): string {
		return EUsersSQLQuery.ONE_BY_EMAIL;
	}

	get #usersReadSQLQuery(): string {
		return EUsersSQLQuery.ALL;
	}

	get #userCreateStatement() {
		return this.#database.prepare<[TUserCreateSchema]>(this.#userReadSQLQuery);
	}

	get #userFindByIdStatement() {
		return this.#database.prepare<[TId], Pick<TUserSchema, 'id' | 'email'>>(
			this.#userReadSQLQuery,
		);
	}

	get #userFindByEmailStatement() {
		return this.#database.prepare<[string], TUserSchema>(
			this.#userReadByEmailSQLQuery,
		);
	}

	get #usersFindAllStatement() {
		return this.#database.prepare<[], Pick<TUserSchema, 'id' | 'email'>>(
			this.#usersReadSQLQuery,
		);
	}
}
