/// <reference types="vite-plugin-pwa/vanillajs" />
import { registerSW } from 'virtual:pwa-register';

export function registerServiceWorker() {
	let updateSW = registerSW({
		onNeedRefresh() {
			let isUpdateAccepted = window.confirm(
				'New version of the app is available. Do you want to install update?',
			);

			if (isUpdateAccepted) {
				updateSW();
			}
		},
	});
}
