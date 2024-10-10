import { generateToken } from '#app/modules/crypto/token';

export class Session {
	#storage: Set<string>;

	constructor() {
		this.#storage = new Set<string>();
	}

	public create() {
		let sessionId = generateToken();

		this.#storage.add(sessionId);

		return sessionId;
	}

	public has(sessionId: string): boolean {
		return this.#storage.has(sessionId);
	}

	public remove(id: string): this {
		this.#storage.delete(id);

		return this;
	}
}
