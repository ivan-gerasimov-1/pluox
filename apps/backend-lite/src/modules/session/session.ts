import { generateToken } from '#app/modules/crypto/token';
import type { ISession, TSessionData } from '#app/modules/session/types';
import type { TId } from '#app/types';

export class Session implements ISession {
	#storage: Map<TId, TSessionData>;

	constructor() {
		this.#storage = new Map();
	}

	public create(payload: TSessionData) {
		let sessionId = generateToken();

		this.#storage.set(sessionId, payload);

		return sessionId;
	}

	public has(sessionId: string): boolean {
		return this.#storage.has(sessionId);
	}

	public get(sessionId: string): TSessionData | null {
		if (!this.#storage.has(sessionId)) {
			return null;
		}

		return this.#storage.get(sessionId) ?? null;
	}

	public remove(id: string): this {
		this.#storage.delete(id);

		return this;
	}
}
