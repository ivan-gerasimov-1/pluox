const EServiceWorkerEvent = {
	LOAD: 'load',
} as const;

function hasServiceWorkerSupport() {
	return 'serviceWorker' in navigator;
}

export function registerServiceWorker() {
	if (!hasServiceWorkerSupport()) {
		console.log('Service worker is not supported in this browser');
	}

	window.addEventListener(EServiceWorkerEvent.LOAD, () => {
		navigator.serviceWorker.register('/sw.js');
	});
}
