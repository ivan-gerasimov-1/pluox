import type {
	ICookie,
	TCookieName,
	TCookieContainer,
	TCookieOptions,
} from './types';

export class Cookie implements ICookie {
	#cookie: Map<TCookieName, TCookieContainer>;

	constructor() {
		this.#cookie = new Map();
	}

	public parse(cookie: string): Map<TCookieName, TCookieContainer> {
		cookie
			.split(';')
			.filter(Boolean)
			.reduce((state, cookie) => {
				let [key, value] = cookie.split('=');

				state.set(key, {
					value,
				});

				return state;
			}, this.#cookie);

		return this.#cookie;
	}

	public serialize(): string {
		let cookie = '';

		for (let [key, container] of this.#cookie.entries()) {
			cookie += `${key}=${container.value}; `;

			for (let [key, value] of Object.entries(container)) {
				if (key === 'value') {
					continue;
				}

				cookie += `${key}=${value}; `;
			}
		}

		return cookie;
	}

	public getValue(key: string): string | null {
		if (!this.#cookie.has(key)) {
			return;
		}

		return this.#cookie.get(key).value;
	}

	public get(key: string): TCookieContainer | null {
		if (!this.#cookie.has(key)) {
			return null;
		}

		return this.#cookie.get(key);
	}

	/**
	 * @docs
	 * secure
	 * httpOnly
	 * Expires / Max-Age
	 * Domain / Path
	 * SameSite=Strict
	 */
	public set(key: string, value: string, options?: TCookieOptions): void {
		this.#cookie.set(key, {
			value,
			...options,
		});
	}
}
