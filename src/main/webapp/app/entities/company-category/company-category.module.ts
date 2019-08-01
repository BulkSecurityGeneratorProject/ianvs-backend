import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IanvsSharedModule } from 'app/shared';
import {
    CompanyCategoryComponent,
    CompanyCategoryDetailComponent,
    CompanyCategoryUpdateComponent,
    CompanyCategoryDeletePopupComponent,
    CompanyCategoryDeleteDialogComponent,
    companyCategoryRoute,
    companyCategoryPopupRoute
} from './';

const ENTITY_STATES = [...companyCategoryRoute, ...companyCategoryPopupRoute];

@NgModule({
    imports: [IanvsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CompanyCategoryComponent,
        CompanyCategoryDetailComponent,
        CompanyCategoryUpdateComponent,
        CompanyCategoryDeleteDialogComponent,
        CompanyCategoryDeletePopupComponent
    ],
    entryComponents: [
        CompanyCategoryComponent,
        CompanyCategoryUpdateComponent,
        CompanyCategoryDeleteDialogComponent,
        CompanyCategoryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IanvsCompanyCategoryModule {}
