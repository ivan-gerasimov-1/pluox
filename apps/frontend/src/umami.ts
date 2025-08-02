export async function initializeUmami(): Promise<void> {
	let script = document.createElement('script');

	script.setAttribute('src', import.meta.env.APP_UMAMI_SCRIPT_URL);
	script.setAttribute('data-website-id', import.meta.env.APP_UMAMI_WEBSITE_ID);
	script.setAttribute('defer', '');

	document.body.appendChild(script);
}
