import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { cn } from '@/web/utils/classnames';

export type TBackdropProps = {
	isVisible: boolean;

	onClick?(event: unknown): void;
};

let classNames = {
	appear: 'bg-transparent backdrop-blur-none',
	appearActive: 'bg-gray-100/75! backdrop-blur-xs!',
	appearDone: 'bg-gray-100/75! backdrop-blur-xs!',

	enter: 'bg-transparent backdrop-blur-none',
	enterActive: 'bg-gray-100/75! backdrop-blur-xs!',
	enterDone: 'bg-gray-100/75! backdrop-blur-xs!',

	exit: 'bg-gray-100/75 backdrop-blur-xs',
	exitActive: 'bg-transparent! backdrop-blur-none!',
	exitDone: 'bg-transparent! backdrop-blur-none!',
};

export function Backdrop({ isVisible, onClick }: TBackdropProps) {
	let backdropRef = useRef(null);

	return (
		<CSSTransition
			nodeRef={backdropRef}
			in={isVisible}
			timeout={200}
			classNames={classNames}
			appear
			mountOnEnter
			unmountOnExit
		>
			<div
				ref={backdropRef}
				className="inset-0 fixed z-50 transition will-change-[backdrop-filter]"
				onClick={onClick}
			/>
		</CSSTransition>
	);
}
