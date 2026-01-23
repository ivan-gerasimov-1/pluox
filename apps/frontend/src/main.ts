import { runApplication } from '@/application';
import { runIntegrations } from '@/integrations';
import { registerServiceWorker } from '@/serviceWorker';

import type { IWindow } from '@/web/types';

(function main(window: IWindow) {
	runIntegrations();

	registerServiceWorker();

	runApplication(window);
})(window);
