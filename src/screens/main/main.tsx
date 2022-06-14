import { ActionSheet } from '@components/action-sheet';
import { MoneyLeft, MoneySpent } from '@modules/spendings';
import { NewSpendingCard } from '@modules/spendings/new-spending-card';
import { EAppPath } from '@root/app-path';
import { ActionSheetContainer } from '@root/screens/main/components/action-sheet-container /action-sheet-container';
import { Card, CardContainer } from '@root/ui-kit';
import { Navigable } from '@root/ui-kit/navigable/navigable';

export function MainScreen() {
	return (
		<>
			<CardContainer>
				<Card>
					<MoneyLeft />
				</Card>

				<Navigable to={EAppPath.SPENDING_LIST}>
					<Card touchable>
						<MoneySpent />
					</Card>
				</Navigable>
			</CardContainer>

			<ActionSheetContainer>
				<ActionSheet>
					<NewSpendingCard />
				</ActionSheet>
			</ActionSheetContainer>
		</>
	);
}
