import { cls } from '@root/presentation/web-ui/utils/classnames';

type TScreenProps = {
	className?: string;
};

export function Screen(props: React.PropsWithChildren<TScreenProps>) {
	return (
		<div className={cls('flex min-h-dvh flex-col', props.className)}>
			{props.children}
		</div>
	);
}
