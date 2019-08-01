import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IanvsSharedModule } from 'app/shared';
import {
    BranchStatusComponent,
    BranchStatusDetailComponent,
    BranchStatusUpdateComponent,
    BranchStatusDeletePopupComponent,
    BranchStatusDeleteDialogComponent,
    branchStatusRoute,
    branchStatusPopupRoute
} from './';

const ENTITY_STATES = [...branchStatusRoute, ...branchStatusPopupRoute];

@NgModule({
    imports: [IanvsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BranchStatusComponent,
        BranchStatusDetailComponent,
        BranchStatusUpdateComponent,
        BranchStatusDeleteDialogComponent,
        BranchStatusDeletePopupComponent
    ],
    entryComponents: [
        BranchStatusComponent,
        BranchStatusUpdateComponent,
        BranchStatusDeleteDialogComponent,
        BranchStatusDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IanvsBranchStatusModule {}
