export function parseSafeToNull<T>(target: string): T | null {
	try {
		return JSON.parse(target);
	} catch {
		return null;
	}
}
