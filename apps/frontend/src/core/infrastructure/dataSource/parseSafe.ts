export function parseSafe<T>(payload: string): T | {} {
	try {
		return JSON.parse(payload);
	} catch {
		return {};
	}
}
