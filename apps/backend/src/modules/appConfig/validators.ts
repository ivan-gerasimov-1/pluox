export function isDefined(value: unknown): boolean {
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
