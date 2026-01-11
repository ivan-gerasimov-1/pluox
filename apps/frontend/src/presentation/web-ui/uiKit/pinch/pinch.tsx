import { cls } from '@root/presentation/web-ui/utils/classnames';

type TPinchProps = {
	className?: string;
};

export function Pinch({ className }: TPinchProps) {
	return (
		<div
			className={cls(
				className,
				'h-1 rounded-3xl bg-neutral-400 -mt-4 mb-6 mx-auto w-[10%]',
			)}
		/>
	);
}
