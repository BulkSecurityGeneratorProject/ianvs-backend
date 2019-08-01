import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IncomeDetails } from 'app/shared/model/income-details.model';
import { IncomeDetailsService } from './income-details.service';
import { IncomeDetailsComponent } from './income-details.component';
import { IncomeDetailsDetailComponent } from './income-details-detail.component';
import { IncomeDetailsUpdateComponent } from './income-details-update.component';
import { IncomeDetailsDeletePopupComponent } from './income-details-delete-dialog.component';
import { IIncomeDetails } from 'app/shared/model/income-details.model';

@Injectable({ providedIn: 'root' })
export class IncomeDetailsResolve implements Resolve<IIncomeDetails> {
    constructor(private service: IncomeDetailsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IIncomeDetails> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<IncomeDetails>) => response.ok),
                map((incomeDetails: HttpResponse<IncomeDetails>) => incomeDetails.body)
            );
        }
        return of(new IncomeDetails());
    }
}

export const incomeDetailsRoute: Routes = [
    {
        path: '',
        component: IncomeDetailsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IncomeDetails'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: IncomeDetailsDetailComponent,
        resolve: {
            incomeDetails: IncomeDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IncomeDetails'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: IncomeDetailsUpdateComponent,
        resolve: {
            incomeDetails: IncomeDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IncomeDetails'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: IncomeDetailsUpdateComponent,
        resolve: {
            incomeDetails: IncomeDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IncomeDetails'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const incomeDetailsPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: IncomeDetailsDeletePopupComponent,
        resolve: {
            incomeDetails: IncomeDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IncomeDetails'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
