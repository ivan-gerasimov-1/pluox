import { MoneyLeft, MoneySpent } from '@modules/spendings';
import { EAppPath } from '@root/app-path';
import { Navigable } from '@root/ui-kit/navigable/navigable';
import { Card, CardContainer } from '@root/ui-kit';

export function MainScreen() {
	return (
		<CardContainer>
			<Card>
				<MoneyLeft />
			</Card>

			<Navigable to={EAppPath.SPENDING_LIST}>
				<Card pressable>
					<MoneySpent />
				</Card>
			</Navigable>
		</CardContainer>
	);
}
