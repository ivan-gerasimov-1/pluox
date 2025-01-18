import { Entity } from '@root/core/domain/entity/entity';
import type { TISODateString } from '@root/core/domain/temporal/types';
import type { Id } from '@root/core/domain/types';
import type { ELocaleCode } from '@root/core/modules/intl/domain/enums';
import type { IUser } from '@root/core/modules/user/domain/userEntity/types';

export class User extends Entity implements IUser {
	#email: string;
	#name: string;
	#locale: ELocaleCode;

	constructor(
		id: Id,
		email: string,
		name: string,
		locale: ELocaleCode,
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

	public get locale(): ELocaleCode {
		return this.#locale;
	}

	public set name(email: string) {
		this.#name = email;

		this.touch();
	}

	public set locale(locale: ELocaleCode) {
		this.#locale = locale;

		this.touch();
	}
}
