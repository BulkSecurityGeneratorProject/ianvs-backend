import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IncomeCapture } from 'app/shared/model/income-capture.model';
import { IncomeCaptureService } from './income-capture.service';
import { IncomeCaptureComponent } from './income-capture.component';
import { IncomeCaptureDetailComponent } from './income-capture-detail.component';
import { IncomeCaptureUpdateComponent } from './income-capture-update.component';
import { IncomeCaptureDeletePopupComponent } from './income-capture-delete-dialog.component';
import { IIncomeCapture } from 'app/shared/model/income-capture.model';

@Injectable({ providedIn: 'root' })
export class IncomeCaptureResolve implements Resolve<IIncomeCapture> {
    constructor(private service: IncomeCaptureService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IIncomeCapture> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<IncomeCapture>) => response.ok),
                map((incomeCapture: HttpResponse<IncomeCapture>) => incomeCapture.body)
            );
        }
        return of(new IncomeCapture());
    }
}

export const incomeCaptureRoute: Routes = [
    {
        path: '',
        component: IncomeCaptureComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IncomeCaptures'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: IncomeCaptureDetailComponent,
        resolve: {
            incomeCapture: IncomeCaptureResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IncomeCaptures'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: IncomeCaptureUpdateComponent,
        resolve: {
            incomeCapture: IncomeCaptureResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IncomeCaptures'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: IncomeCaptureUpdateComponent,
        resolve: {
            incomeCapture: IncomeCaptureResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IncomeCaptures'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const incomeCapturePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: IncomeCaptureDeletePopupComponent,
        resolve: {
            incomeCapture: IncomeCaptureResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IncomeCaptures'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
