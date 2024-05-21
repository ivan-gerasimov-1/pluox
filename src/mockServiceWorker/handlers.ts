import { http, HttpResponse } from 'msw';

export const handlers = [
	http.post('https://cevggnepxhwjwjwkisoq.supabase.co/rest/v1/backups', () => {
		return HttpResponse.text('', {
			status: 201,
		});
	}),

	http.post('/api/expenses', () => {
		return HttpResponse.json({
			id: `EXP${Date.now()}`,
		});
	}),
];
