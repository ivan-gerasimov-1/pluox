import { http, HttpResponse } from 'msw';

export const handlers = [
	http.post('/api/expenses', () => {
		return HttpResponse.json({
			id: `EXP${Date.now()}`,
		});
	}),

	http.post('/api/login', () => {
		return HttpResponse.json({
			id: `U${Date.now()}`,
			email: 'mock@mail.com',
			token: 'MOCK_TOKEN',
		});
	}),
];
