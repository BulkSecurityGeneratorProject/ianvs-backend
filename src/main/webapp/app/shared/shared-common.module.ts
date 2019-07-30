import { NgModule } from '@angular/core';

import { IanvsSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [IanvsSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [IanvsSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class IanvsSharedCommonModule {}
