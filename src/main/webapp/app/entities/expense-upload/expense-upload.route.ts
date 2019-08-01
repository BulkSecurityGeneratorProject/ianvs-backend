import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ExpenseUpload } from 'app/shared/model/expense-upload.model';
import { ExpenseUploadService } from './expense-upload.service';
import { ExpenseUploadComponent } from './expense-upload.component';
import { ExpenseUploadDetailComponent } from './expense-upload-detail.component';
import { ExpenseUploadUpdateComponent } from './expense-upload-update.component';
import { ExpenseUploadDeletePopupComponent } from './expense-upload-delete-dialog.component';
import { IExpenseUpload } from 'app/shared/model/expense-upload.model';

@Injectable({ providedIn: 'root' })
export class ExpenseUploadResolve implements Resolve<IExpenseUpload> {
    constructor(private service: ExpenseUploadService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IExpenseUpload> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ExpenseUpload>) => response.ok),
                map((expenseUpload: HttpResponse<ExpenseUpload>) => expenseUpload.body)
            );
        }
        return of(new ExpenseUpload());
    }
}

export const expenseUploadRoute: Routes = [
    {
        path: '',
        component: ExpenseUploadComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExpenseUploads'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ExpenseUploadDetailComponent,
        resolve: {
            expenseUpload: ExpenseUploadResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExpenseUploads'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ExpenseUploadUpdateComponent,
        resolve: {
            expenseUpload: ExpenseUploadResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExpenseUploads'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ExpenseUploadUpdateComponent,
        resolve: {
            expenseUpload: ExpenseUploadResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExpenseUploads'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const expenseUploadPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ExpenseUploadDeletePopupComponent,
        resolve: {
            expenseUpload: ExpenseUploadResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExpenseUploads'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
