import { initializeSentry } from '@/web/integrations/sentry';
import { initializeUmami } from '@/web/integrations/umami';

export function runIntegrations() {
	initializeUmami();
	initializeSentry();
}
