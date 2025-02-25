import type { TId, TPassword } from '#app/types';

export type TUserCreateSchema = Pick<TUserSchema, 'id' | 'email' | 'password'>;

export type TUserSchema = {
	id: TId;
	email: string;
	password: TPassword;
};
