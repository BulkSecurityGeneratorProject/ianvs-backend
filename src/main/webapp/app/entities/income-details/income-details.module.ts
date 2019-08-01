import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IanvsSharedModule } from 'app/shared';
import {
    IncomeDetailsComponent,
    IncomeDetailsDetailComponent,
    IncomeDetailsUpdateComponent,
    IncomeDetailsDeletePopupComponent,
    IncomeDetailsDeleteDialogComponent,
    incomeDetailsRoute,
    incomeDetailsPopupRoute
} from './';

const ENTITY_STATES = [...incomeDetailsRoute, ...incomeDetailsPopupRoute];

@NgModule({
    imports: [IanvsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        IncomeDetailsComponent,
        IncomeDetailsDetailComponent,
        IncomeDetailsUpdateComponent,
        IncomeDetailsDeleteDialogComponent,
        IncomeDetailsDeletePopupComponent
    ],
    entryComponents: [
        IncomeDetailsComponent,
        IncomeDetailsUpdateComponent,
        IncomeDetailsDeleteDialogComponent,
        IncomeDetailsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IanvsIncomeDetailsModule {}
