export interface IAuthSerivce {
	signIn(
		email: string,
		password: string,
	): Promise<{
		email: string;
	}>;

	logIn(
		email: string,
		password: string,
	): Promise<{
		id: string;
		email: string;
	}>;
	signOut(): Promise<void>;
}
