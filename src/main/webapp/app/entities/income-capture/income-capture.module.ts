import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IanvsSharedModule } from 'app/shared';
import {
    IncomeCaptureComponent,
    IncomeCaptureDetailComponent,
    IncomeCaptureUpdateComponent,
    IncomeCaptureDeletePopupComponent,
    IncomeCaptureDeleteDialogComponent,
    incomeCaptureRoute,
    incomeCapturePopupRoute
} from './';

const ENTITY_STATES = [...incomeCaptureRoute, ...incomeCapturePopupRoute];

@NgModule({
    imports: [IanvsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        IncomeCaptureComponent,
        IncomeCaptureDetailComponent,
        IncomeCaptureUpdateComponent,
        IncomeCaptureDeleteDialogComponent,
        IncomeCaptureDeletePopupComponent
    ],
    entryComponents: [
        IncomeCaptureComponent,
        IncomeCaptureUpdateComponent,
        IncomeCaptureDeleteDialogComponent,
        IncomeCaptureDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IanvsIncomeCaptureModule {}
