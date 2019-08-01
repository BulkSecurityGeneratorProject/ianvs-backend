import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CompanyCategory } from 'app/shared/model/company-category.model';
import { CompanyCategoryService } from './company-category.service';
import { CompanyCategoryComponent } from './company-category.component';
import { CompanyCategoryDetailComponent } from './company-category-detail.component';
import { CompanyCategoryUpdateComponent } from './company-category-update.component';
import { CompanyCategoryDeletePopupComponent } from './company-category-delete-dialog.component';
import { ICompanyCategory } from 'app/shared/model/company-category.model';

@Injectable({ providedIn: 'root' })
export class CompanyCategoryResolve implements Resolve<ICompanyCategory> {
    constructor(private service: CompanyCategoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICompanyCategory> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CompanyCategory>) => response.ok),
                map((companyCategory: HttpResponse<CompanyCategory>) => companyCategory.body)
            );
        }
        return of(new CompanyCategory());
    }
}

export const companyCategoryRoute: Routes = [
    {
        path: '',
        component: CompanyCategoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanyCategories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CompanyCategoryDetailComponent,
        resolve: {
            companyCategory: CompanyCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanyCategories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CompanyCategoryUpdateComponent,
        resolve: {
            companyCategory: CompanyCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanyCategories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CompanyCategoryUpdateComponent,
        resolve: {
            companyCategory: CompanyCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanyCategories'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const companyCategoryPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CompanyCategoryDeletePopupComponent,
        resolve: {
            companyCategory: CompanyCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanyCategories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
