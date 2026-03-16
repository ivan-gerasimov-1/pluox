import { useState } from 'react';

export function useToggle(initialState: boolean): {
	state: boolean;
	toggle: () => void;
	setOn: () => void;
	setOff: () => void;
} {
	let [state, setState] = useState<boolean>(initialState);

	function toggle() {
		setState((prevState) => !prevState);
	}

	function setOn() {
		setState(true);
	}

	function setOff() {
		setState(false);
	}

	return {
		state,
		toggle,
		setOn,
		setOff,
	};
}
