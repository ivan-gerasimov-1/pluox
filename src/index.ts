import { createUI } from '@root/create-ui';

enum EServiceWorkerEvent {
	LOAD = 'load',
}

if ('serviceWorker' in navigator) {
	window.addEventListener(EServiceWorkerEvent.LOAD, () => {
		navigator.serviceWorker.register('/sw.js');
	});
} else {
	console.log('Service worker is not supported in this browser');
}

function main() {
	createUI();
}

main();
