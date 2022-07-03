export enum EIconSize {
	SMALL = 1,
	MEDIUM,
	LARGE,
}

/**
 * @throws {UnknownIconSizeError}
 */
export function iconSizeToPx(size: EIconSize): '16px' | '24px' | '32px' {
	switch (size) {
		case EIconSize.SMALL:
			return '16px';
		case EIconSize.MEDIUM:
			return '24px';
		case EIconSize.LARGE:
			return '32px';
		default:
			const unknownSize: never = size;

			throw new UnknownIconSizeError(unknownSize);
	}
}

class UnknownIconSizeError extends Error {
	constructor(size: unknown) {
		super(`Unknown icon size: ${size}`);
	}
}
