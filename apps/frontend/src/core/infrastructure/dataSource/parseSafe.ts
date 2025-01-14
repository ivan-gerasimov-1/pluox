export function parseSafeToObject<T extends {}>(target: string): T | {} {
	try {
		return JSON.parse(target);
	} catch {
		return {};
	}
}

export function parseSafeToNull<T>(target: string): T | null {
	try {
		return JSON.parse(target);
	} catch {
		return null;
	}
}
