export function isDefined<T>(value: T | undefined): value is T {
	if (value === undefined) {
		return false;
	}

	return true;
}

export function isEmptyString(value: string): boolean {
	if (value === '') {
		return true;
	}

	return false;
}
