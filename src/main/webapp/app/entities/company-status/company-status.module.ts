import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IanvsSharedModule } from 'app/shared';
import {
    CompanyStatusComponent,
    CompanyStatusDetailComponent,
    CompanyStatusUpdateComponent,
    CompanyStatusDeletePopupComponent,
    CompanyStatusDeleteDialogComponent,
    companyStatusRoute,
    companyStatusPopupRoute
} from './';

const ENTITY_STATES = [...companyStatusRoute, ...companyStatusPopupRoute];

@NgModule({
    imports: [IanvsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CompanyStatusComponent,
        CompanyStatusDetailComponent,
        CompanyStatusUpdateComponent,
        CompanyStatusDeleteDialogComponent,
        CompanyStatusDeletePopupComponent
    ],
    entryComponents: [
        CompanyStatusComponent,
        CompanyStatusUpdateComponent,
        CompanyStatusDeleteDialogComponent,
        CompanyStatusDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IanvsCompanyStatusModule {}
