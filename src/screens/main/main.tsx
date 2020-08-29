import { AddSpending, MoneyLeft, MoneySpent } from '@modules/spendings';
import { Card, CardContainer } from '@root/ui-kit';
import * as React from 'react';

export function MainScreen() {
  return (
    <CardContainer>
      <Card noPadding>
        <AddSpending />
      </Card>

      <Card>
        <MoneySpent />
      </Card>

      <Card>
        <MoneyLeft />
      </Card>
    </CardContainer>
  );
}
