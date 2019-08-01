import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IncomePayments } from 'app/shared/model/income-payments.model';
import { IncomePaymentsService } from './income-payments.service';
import { IncomePaymentsComponent } from './income-payments.component';
import { IncomePaymentsDetailComponent } from './income-payments-detail.component';
import { IncomePaymentsUpdateComponent } from './income-payments-update.component';
import { IncomePaymentsDeletePopupComponent } from './income-payments-delete-dialog.component';
import { IIncomePayments } from 'app/shared/model/income-payments.model';

@Injectable({ providedIn: 'root' })
export class IncomePaymentsResolve implements Resolve<IIncomePayments> {
    constructor(private service: IncomePaymentsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IIncomePayments> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<IncomePayments>) => response.ok),
                map((incomePayments: HttpResponse<IncomePayments>) => incomePayments.body)
            );
        }
        return of(new IncomePayments());
    }
}

export const incomePaymentsRoute: Routes = [
    {
        path: '',
        component: IncomePaymentsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IncomePayments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: IncomePaymentsDetailComponent,
        resolve: {
            incomePayments: IncomePaymentsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IncomePayments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: IncomePaymentsUpdateComponent,
        resolve: {
            incomePayments: IncomePaymentsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IncomePayments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: IncomePaymentsUpdateComponent,
        resolve: {
            incomePayments: IncomePaymentsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IncomePayments'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const incomePaymentsPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: IncomePaymentsDeletePopupComponent,
        resolve: {
            incomePayments: IncomePaymentsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IncomePayments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
