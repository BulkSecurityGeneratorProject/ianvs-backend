import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IanvsSharedModule } from 'app/shared';
import {
    ExpenseUploadComponent,
    ExpenseUploadDetailComponent,
    ExpenseUploadUpdateComponent,
    ExpenseUploadDeletePopupComponent,
    ExpenseUploadDeleteDialogComponent,
    expenseUploadRoute,
    expenseUploadPopupRoute
} from './';

const ENTITY_STATES = [...expenseUploadRoute, ...expenseUploadPopupRoute];

@NgModule({
    imports: [IanvsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ExpenseUploadComponent,
        ExpenseUploadDetailComponent,
        ExpenseUploadUpdateComponent,
        ExpenseUploadDeleteDialogComponent,
        ExpenseUploadDeletePopupComponent
    ],
    entryComponents: [
        ExpenseUploadComponent,
        ExpenseUploadUpdateComponent,
        ExpenseUploadDeleteDialogComponent,
        ExpenseUploadDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IanvsExpenseUploadModule {}
