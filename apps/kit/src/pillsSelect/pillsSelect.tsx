import { useCallback } from 'react';

import { cn } from '@kit/utils/classnames';

import { Badge, Badges } from '@kit/badge/badge';

type TPillsSelectProps<T> = {
	value?: string | null;
	items: T[];

	onSelect(payload?: T): void;
};

export function PillsSelect<T extends { id: string; name: string }>({
	value,
	items,
	onSelect,
}: TPillsSelectProps<T>) {
	let handleSelect = useCallback(
		(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			let target = event.currentTarget;
			let isPressed = target.getAttribute('aria-pressed') === 'true';
			let nextState = !isPressed;

			for (let pill of items) {
				let element = document.getElementById(pill.id);

				if (!element) {
					continue;
				}

				element.setAttribute('aria-pressed', 'false');
			}

			target.setAttribute('aria-pressed', String(nextState));

			let targetItem = items.find((pill) => pill.id === target.id);

			onSelect(nextState ? targetItem : undefined);
		},
		[items, onSelect],
	);

	return (
		<Badges>
			{items.map((item) => {
				return (
					<Badge key={item.id} asChild>
						<button
							id={item.id}
							type="button"
							className={cn(
								'py-3',
								'appearance-none font-[inherit]',
								'transition-colors',
								'aria-pressed:border-gray-500',
							)}
							aria-pressed={item.id === value}
							onClick={handleSelect}
						>
							{item.name}
						</button>
					</Badge>
				);
			})}
		</Badges>
	);
}
