import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ExpenseCategory } from 'app/shared/model/expense-category.model';
import { ExpenseCategoryService } from './expense-category.service';
import { ExpenseCategoryComponent } from './expense-category.component';
import { ExpenseCategoryDetailComponent } from './expense-category-detail.component';
import { ExpenseCategoryUpdateComponent } from './expense-category-update.component';
import { ExpenseCategoryDeletePopupComponent } from './expense-category-delete-dialog.component';
import { IExpenseCategory } from 'app/shared/model/expense-category.model';

@Injectable({ providedIn: 'root' })
export class ExpenseCategoryResolve implements Resolve<IExpenseCategory> {
    constructor(private service: ExpenseCategoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IExpenseCategory> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ExpenseCategory>) => response.ok),
                map((expenseCategory: HttpResponse<ExpenseCategory>) => expenseCategory.body)
            );
        }
        return of(new ExpenseCategory());
    }
}

export const expenseCategoryRoute: Routes = [
    {
        path: '',
        component: ExpenseCategoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExpenseCategories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ExpenseCategoryDetailComponent,
        resolve: {
            expenseCategory: ExpenseCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExpenseCategories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ExpenseCategoryUpdateComponent,
        resolve: {
            expenseCategory: ExpenseCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExpenseCategories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ExpenseCategoryUpdateComponent,
        resolve: {
            expenseCategory: ExpenseCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExpenseCategories'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const expenseCategoryPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ExpenseCategoryDeletePopupComponent,
        resolve: {
            expenseCategory: ExpenseCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ExpenseCategories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
