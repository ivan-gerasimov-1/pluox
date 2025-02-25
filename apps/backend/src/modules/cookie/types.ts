export type TCookieName = string;

export type TCookieOptions = {
	secure?: boolean;
	httpOnly?: boolean;
	expires?: string;
	maxAge?: string;
	domain?: string;
	path?: string;
	sameSite?: 'Strict' | 'Lax' | 'None';
};

export type TCookieContainer = {
	value: string;
} & TCookieOptions;

export interface ICookie {
	parse(cookie: string): Map<TCookieName, TCookieContainer>;

	load(cookie: string): ICookie;

	serialize(options?: { modifiedOnly?: boolean }): string;

	hasModified: boolean;

	get(key: string): TCookieContainer | null;
	getValue(key: string): string | null;

	set(key: string, value: string, options?: TCookieOptions): void;
}
