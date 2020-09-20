import { MoneyLeft, MoneySpent } from '@modules/spendings';
import { AppPath } from '@root/app-path';
import { Card, CardContainer } from '@root/ui-kit';
import * as React from 'react';

export function MainScreen() {
  return (
    <CardContainer>
      <Card>
        <MoneyLeft />
      </Card>

      <Card to={AppPath.SpendingList}>
        <MoneySpent />
      </Card>
    </CardContainer>
  );
}
