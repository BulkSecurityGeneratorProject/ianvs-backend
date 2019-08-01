import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IanvsSharedModule } from 'app/shared';
import {
    IncomePaymentsComponent,
    IncomePaymentsDetailComponent,
    IncomePaymentsUpdateComponent,
    IncomePaymentsDeletePopupComponent,
    IncomePaymentsDeleteDialogComponent,
    incomePaymentsRoute,
    incomePaymentsPopupRoute
} from './';

const ENTITY_STATES = [...incomePaymentsRoute, ...incomePaymentsPopupRoute];

@NgModule({
    imports: [IanvsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        IncomePaymentsComponent,
        IncomePaymentsDetailComponent,
        IncomePaymentsUpdateComponent,
        IncomePaymentsDeleteDialogComponent,
        IncomePaymentsDeletePopupComponent
    ],
    entryComponents: [
        IncomePaymentsComponent,
        IncomePaymentsUpdateComponent,
        IncomePaymentsDeleteDialogComponent,
        IncomePaymentsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IanvsIncomePaymentsModule {}
