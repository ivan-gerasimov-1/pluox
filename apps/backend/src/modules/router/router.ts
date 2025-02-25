type TTrieNode = {
	children: Record<string, TTrieNode>;
	handler: <T>(...args: any) => Promise<T> | null;
	isDynamic: boolean;
	paramName: string | null;
	options: {
		secure?: boolean;
	} | null;
};

export class Router {
	#routes: TTrieNode;

	constructor() {
		this.#routes = this.#createTrieNode();
	}

	public addRoute(path: string, handler, options?: Record<any, any>) {
		let segments = path.split('/').filter(Boolean);
		let currentNode = this.#routes;

		for (const segment of segments) {
			let isDynamic = segment.startsWith(':');
			let key = isDynamic ? ':' : segment;

			if (!currentNode.children[key]) {
				currentNode.children[key] = this.#createTrieNode();
				currentNode.children[key].isDynamic = isDynamic;

				if (isDynamic) {
					currentNode.children[key].paramName = segment.slice(1);
				}
			}

			currentNode = currentNode.children[key];
		}

		currentNode.handler = handler;
		currentNode.options = options;

		return this;
	}

	public match(url: string) {
		const segments = url.split('/').filter(Boolean);
		let currentNode = this.#routes;

		const params = {};
		let options = null;

		for (const segment of segments) {
			if (currentNode.children[segment]) {
				currentNode = currentNode.children[segment];
				options = currentNode.options;
			} else if (currentNode.children[':']) {
				currentNode = currentNode.children[':'];
				params[currentNode.paramName] = segment;
			} else {
				return null;
			}
		}

		return currentNode.handler
			? {
					handler: currentNode.handler,
					options,
					params,
				}
			: null;
	}

	#createTrieNode(): TTrieNode {
		return {
			children: {},
			handler: null,
			isDynamic: false,
			paramName: null,
			options: null,
		};
	}
}
