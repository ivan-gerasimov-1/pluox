import { cls } from '@root/presentation/web-ui/utils/classnames';

type TPillsSelectProps<T> = {
	value?: string | null;
	items: T[];

	onSelect(payload?: T): void;
};

export function PillsSelect<T extends { id: string; name: string }>(
	props: TPillsSelectProps<T>,
) {
	return (
		<div className="gap-1 flex flex-wrap">
			{props.items.map((item) => {
				return (
					<button
						key={item.id}
						id={item.id}
						type="button"
						className={cls(
							'flex grow items-center justify-center',
							'px-4 py-3',
							'appearance-none',
							'leading-none',
							'text-xs',
							'border-neutral-200 rounded-2xl border',
							'bg-white text-neutral-800',
							'transition-colors',
							'aria-pressed:bg-neutral-100 aria-pressed:border-neutral-900',
						)}
						aria-pressed={item.id === props.value}
						onClick={(event) => {
							let target = event.currentTarget;
							let isPressed = target.getAttribute('aria-pressed') === 'true';
							let nextState = !isPressed;

							for (let pill of props.items) {
								let element = document.getElementById(pill.id);

								if (!element) {
									continue;
								}

								element.setAttribute('aria-pressed', 'false');
							}

							target.setAttribute('aria-pressed', String(nextState));

							let targetItem = props.items.find(
								(pill) => pill.id === target.id,
							);

							props.onSelect(nextState ? targetItem : undefined);
						}}
					>
						{item.name}
					</button>
				);
			})}
		</div>
	);
}
