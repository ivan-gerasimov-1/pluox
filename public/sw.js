const EServiceWorkerEvent = {
	ACTIVACTE: 'activate',
	FETCH: 'fetch',
	INSTALL: 'install',
};

/**
 * @returns {void}
 */
function noop() {}

self.addEventListener(EServiceWorkerEvent.INSTALL, noop);
self.addEventListener(EServiceWorkerEvent.ACTIVACTE, noop);
self.addEventListener(EServiceWorkerEvent.FETCH, noop);
