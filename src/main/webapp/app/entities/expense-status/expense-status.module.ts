import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IanvsSharedModule } from 'app/shared';
import {
    ExpenseStatusComponent,
    ExpenseStatusDetailComponent,
    ExpenseStatusUpdateComponent,
    ExpenseStatusDeletePopupComponent,
    ExpenseStatusDeleteDialogComponent,
    expenseStatusRoute,
    expenseStatusPopupRoute
} from './';

const ENTITY_STATES = [...expenseStatusRoute, ...expenseStatusPopupRoute];

@NgModule({
    imports: [IanvsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ExpenseStatusComponent,
        ExpenseStatusDetailComponent,
        ExpenseStatusUpdateComponent,
        ExpenseStatusDeleteDialogComponent,
        ExpenseStatusDeletePopupComponent
    ],
    entryComponents: [
        ExpenseStatusComponent,
        ExpenseStatusUpdateComponent,
        ExpenseStatusDeleteDialogComponent,
        ExpenseStatusDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IanvsExpenseStatusModule {}
