import type {
	ICookie,
	TCookieName,
	TCookieContainer,
	TCookieOptions,
} from './types';

export class Cookie implements ICookie {
	#cookie: Map<TCookieName, TCookieContainer>;
	#midfiedCookie: Set<TCookieName>;

	constructor() {
		this.#cookie = new Map();
		this.#midfiedCookie = new Set();
	}

	public get hasModified(): boolean {
		return this.#midfiedCookie.size > 0;
	}

	public load(rawCookie: string): this {
		this.#cookie = this.parse(rawCookie);

		return this;
	}

	public parse(rawCookie: string): Map<TCookieName, TCookieContainer> {
		let cookie = new Map<TCookieName, TCookieContainer>();

		if (!rawCookie) {
			return cookie;
		}

		rawCookie
			.split(';')
			.filter(Boolean)
			.reduce((state, cookie) => {
				let [key, value] = cookie.split('=');

				state.set(key, {
					value,
				});

				return state;
			}, cookie);

		return cookie;
	}

	public serialize(options?: { modifiedOnly?: boolean }): string {
		if (options?.modifiedOnly && !this.hasModified) {
			return '';
		}

		let cookie = '';

		for (let [key, container] of this.#cookie.entries()) {
			if (options?.modifiedOnly && !this.#midfiedCookie.has(key)) {
				continue;
			}

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
		this.#midfiedCookie.add(key);

		this.#cookie.set(key, {
			value,
			...options,
		});
	}
}
