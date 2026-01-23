export interface IAuthSerivce {
	signUp(
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
	logOut(): Promise<void>;
}
