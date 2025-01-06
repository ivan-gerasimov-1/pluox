import { Entity } from '@root/core/domain/entity/entity';
import type { Id } from '@root/core/domain/types';
import type { TISODateString } from '@root/core/domain/temporal/types';
import type { IUser } from '@root/core/modules/user/domain/userEntity/types';

export class User extends Entity implements IUser {
	#email: string;
	#name: string;

	constructor(
		id: Id,
		email: string,
		name: string,
		createdAt: TISODateString,
		modifiedAt?: TISODateString,
	) {
		super(id, createdAt, modifiedAt);

		this.#email = email;
		this.#name = name;
	}

	public static create(
		id: Id,
		email: string,
		name: string,
		createdAt: TISODateString,
		modifiedAt?: TISODateString,
	): IUser {
		return new User(id, email, name, createdAt, modifiedAt);
	}

	public get email(): string {
		return this.#email;
	}

	public get name(): string {
		return this.#name;
	}
}
