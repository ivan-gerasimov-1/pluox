export interface IServiceContainer {}
export class ServiceContainer implements IServiceContainer {
	#instances = new Map();

	public resolve(key: Symbol) {
		return this.#instances.get(key);
	}

	public register(key: Symbol, instance: unknown) {
		this.#instances.set(key, instance);
	}
}
