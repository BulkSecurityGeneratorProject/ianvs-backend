import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IanvsSharedModule } from 'app/shared';
import {
    ExpenseCategoryComponent,
    ExpenseCategoryDetailComponent,
    ExpenseCategoryUpdateComponent,
    ExpenseCategoryDeletePopupComponent,
    ExpenseCategoryDeleteDialogComponent,
    expenseCategoryRoute,
    expenseCategoryPopupRoute
} from './';

const ENTITY_STATES = [...expenseCategoryRoute, ...expenseCategoryPopupRoute];

@NgModule({
    imports: [IanvsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ExpenseCategoryComponent,
        ExpenseCategoryDetailComponent,
        ExpenseCategoryUpdateComponent,
        ExpenseCategoryDeleteDialogComponent,
        ExpenseCategoryDeletePopupComponent
    ],
    entryComponents: [
        ExpenseCategoryComponent,
        ExpenseCategoryUpdateComponent,
        ExpenseCategoryDeleteDialogComponent,
        ExpenseCategoryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IanvsExpenseCategoryModule {}
