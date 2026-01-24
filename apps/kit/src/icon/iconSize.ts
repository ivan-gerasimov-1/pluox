export const EIconSize = {
	SMALL: 1,
	MEDIUM: 2,
	LARGE: 3,
} as const;

export type TIconSize = (typeof EIconSize)[keyof typeof EIconSize];

/**
 * @throws {UnknownIconSizeError}
 */
export function iconSizeToPx(size: TIconSize): '16px' | '24px' | '32px' {
	switch (size) {
		case EIconSize.SMALL:
			return '16px';
		case EIconSize.MEDIUM:
			return '24px';
		case EIconSize.LARGE:
			return '32px';
		default: {
			const unknownSize: never = size;

			throw new UnknownIconSizeError(unknownSize);
		}
	}
}

class UnknownIconSizeError extends Error {
	constructor(size: unknown) {
		super(`Unknown icon size: ${size}`);
	}
}
