export function validateNumber(value: string): boolean {
	if (RegExp('[A-z]+').test(value)) {
		return false;
	}

	/**
	 * @todo Handle different decimal separators
	 */
	/* if (value.includes(',')) {
		return false;
	} */

	if (value.split('.').length > 2) {
		return false;
	}

	return true;
}
