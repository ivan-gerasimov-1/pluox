import { useState } from 'react';

export function usePending() {
	const [pending, setPending] = useState<boolean>(false);

	return {
		pending,
		setPending,
	};
}
