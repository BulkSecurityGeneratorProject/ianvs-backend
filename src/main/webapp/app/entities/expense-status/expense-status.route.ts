import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ExpenseStatus } from 'app/shared/model/expense-status.model';
import { ExpenseStatusService } from './expense-status.service';
import { ExpenseStatusComponent } from './expense-status.component';
import { ExpenseStatusDetailComponent } from './expense-status-detail.component';
import { ExpenseStatusUpdateComponent } from './expense-status-update.component';
import { ExpenseStatusDeletePopupComponent } from './expense-status-delete-dialog.component';
import { IExpenseStatus } from 'app/shared/model/expense-status.model';

@Injectable({ providedIn: 'root' })
export class ExpenseStatusResolve implements Resolve<IExpenseStatus> {
    constructor(private service: ExpenseStatusService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IExpenseStatus> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ExpenseStatus>) => response.ok),
                map((expenseStatus: HttpResponse<ExpenseStatus>) => expenseStatus.body)
            );
        }
        return of(new ExpenseStatus());
    }
}

export const expenseStatusRoute: Routes = [
    {
        path: '',
        component: ExpenseStatusComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExpenseStatuses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ExpenseStatusDetailComponent,
        resolve: {
            expenseStatus: ExpenseStatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExpenseStatuses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ExpenseStatusUpdateComponent,
        resolve: {
            expenseStatus: ExpenseStatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExpenseStatuses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ExpenseStatusUpdateComponent,
        resolve: {
            expenseStatus: ExpenseStatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExpenseStatuses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const expenseStatusPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ExpenseStatusDeletePopupComponent,
        resolve: {
            expenseStatus: ExpenseStatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExpenseStatuses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
