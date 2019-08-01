import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IncomeCategory } from 'app/shared/model/income-category.model';
import { IncomeCategoryService } from './income-category.service';
import { IncomeCategoryComponent } from './income-category.component';
import { IncomeCategoryDetailComponent } from './income-category-detail.component';
import { IncomeCategoryUpdateComponent } from './income-category-update.component';
import { IncomeCategoryDeletePopupComponent } from './income-category-delete-dialog.component';
import { IIncomeCategory } from 'app/shared/model/income-category.model';

@Injectable({ providedIn: 'root' })
export class IncomeCategoryResolve implements Resolve<IIncomeCategory> {
    constructor(private service: IncomeCategoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IIncomeCategory> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<IncomeCategory>) => response.ok),
                map((incomeCategory: HttpResponse<IncomeCategory>) => incomeCategory.body)
            );
        }
        return of(new IncomeCategory());
    }
}

export const incomeCategoryRoute: Routes = [
    {
        path: '',
        component: IncomeCategoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IncomeCategories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: IncomeCategoryDetailComponent,
        resolve: {
            incomeCategory: IncomeCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IncomeCategories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: IncomeCategoryUpdateComponent,
        resolve: {
            incomeCategory: IncomeCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IncomeCategories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: IncomeCategoryUpdateComponent,
        resolve: {
            incomeCategory: IncomeCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IncomeCategories'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const incomeCategoryPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: IncomeCategoryDeletePopupComponent,
        resolve: {
            incomeCategory: IncomeCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'IncomeCategories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
