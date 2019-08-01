import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IanvsSharedModule } from 'app/shared';
import {
    IncomeCategoryComponent,
    IncomeCategoryDetailComponent,
    IncomeCategoryUpdateComponent,
    IncomeCategoryDeletePopupComponent,
    IncomeCategoryDeleteDialogComponent,
    incomeCategoryRoute,
    incomeCategoryPopupRoute
} from './';

const ENTITY_STATES = [...incomeCategoryRoute, ...incomeCategoryPopupRoute];

@NgModule({
    imports: [IanvsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        IncomeCategoryComponent,
        IncomeCategoryDetailComponent,
        IncomeCategoryUpdateComponent,
        IncomeCategoryDeleteDialogComponent,
        IncomeCategoryDeletePopupComponent
    ],
    entryComponents: [
        IncomeCategoryComponent,
        IncomeCategoryUpdateComponent,
        IncomeCategoryDeleteDialogComponent,
        IncomeCategoryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IanvsIncomeCategoryModule {}
