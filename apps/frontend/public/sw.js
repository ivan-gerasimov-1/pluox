const EServiceWorkerEvent = {
	ACTIVATE: 'activate',
	FETCH: 'fetch',
	INSTALL: 'install',
};

/**
 * @returns {void}
 */
function noop() {}

self.addEventListener(EServiceWorkerEvent.INSTALL, noop);
self.addEventListener(EServiceWorkerEvent.ACTIVATE, noop);
self.addEventListener(EServiceWorkerEvent.FETCH, noop);
