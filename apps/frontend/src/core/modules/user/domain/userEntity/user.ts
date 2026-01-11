import { Entity } from '@/core/domain/entity/entity';
import type { TISODateString } from '@/core/domain/temporal/types';
import type { Id } from '@/core/domain/types';

import type { TLocaleCode } from '@/core/modules/intl/domain/types';
import type { IUser } from '@/core/modules/user/domain/userEntity/types';

export class User extends Entity implements IUser {
	#email: string;
	#name: string;
	#locale: TLocaleCode;

	constructor(
		id: Id,
		email: string,
		name: string,
		locale: TLocaleCode,
		createdAt: TISODateString,
		modifiedAt?: TISODateString,
	) {
		super(id, createdAt, modifiedAt);

		this.#email = email;
		this.#name = name;
		this.#locale = locale;
	}

	public get email(): string {
		return this.#email;
	}

	public get name(): string {
		return this.#name;
	}

	public set name(email: string) {
		this.#name = email;

		this.touch();
	}

	public get locale(): TLocaleCode {
		return this.#locale;
	}

	public set locale(locale: TLocaleCode) {
		this.#locale = locale;

		this.touch();
	}
}
