import { http, HttpResponse, type StrictRequest } from 'msw';

export const handlers = [
	http.post(
		'/api/login',
		async ({ request }: { request: StrictRequest<{ email: string }> }) => {
			let body = await request.json();

			return HttpResponse.json({
				id: Date.now().toString(),
				email: body.email,
			});
		},
	),
];
