/// <reference types="vite-plugin-pwa/vanillajs" />
import { registerSW } from 'virtual:pwa-register';

export function registerServiceWorker() {
	let updateSW = registerSW({
		onNeedRefresh() {
			// eslint-disable-next-line no-alert
			let isUpdateAccepted = window.confirm(
				'New version of the app is available. Do you want to install update?',
			);

			if (isUpdateAccepted) {
				updateSW();
			}
		},
	});
}
