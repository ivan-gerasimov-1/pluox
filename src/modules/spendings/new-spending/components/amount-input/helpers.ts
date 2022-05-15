export function validateNumber(value: string): boolean {
	if (RegExp('[A-z]+').test(value)) {
		return false;
	}

	if (value.includes(',')) {
		return false;
	}

	if (value.split('.').length > 2) {
		return false;
	}

	return true;
}
