export function parseSafeToObject<T extends {}>(target: string): T | {} {
	try {
		return JSON.parse(target);
	} catch {
		return {};
	}
}
