import { App } from '@components/app/app';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

export function bootstrapApp() {
	const rootElement = getRootElement('root');

	createRoot(rootElement).render(
		<StrictMode>
			<App />
		</StrictMode>
	);
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
