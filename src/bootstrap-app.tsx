import { createRoot } from 'react-dom/client';
import { App } from './app';
import './app.css';
import './reset.css';

export function bootstrapApp() {
	const rootElement = getRootElement('root');

	createRoot(rootElement).render(<App />);
}

/**
 * @throws HTMLElementNotFoundError
 */
function getRootElement(id: string): HTMLElement {
	const element = document.getElementById('root');

	if (element === null) {
		throw new HTMLElementNotFoundError();
	}

	return element;
}

class HTMLElementNotFoundError extends Error {
	constructor() {
		super('HTMLElement Not Found');
	}
}
