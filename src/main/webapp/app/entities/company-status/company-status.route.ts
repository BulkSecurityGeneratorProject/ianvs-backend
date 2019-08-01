import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CompanyStatus } from 'app/shared/model/company-status.model';
import { CompanyStatusService } from './company-status.service';
import { CompanyStatusComponent } from './company-status.component';
import { CompanyStatusDetailComponent } from './company-status-detail.component';
import { CompanyStatusUpdateComponent } from './company-status-update.component';
import { CompanyStatusDeletePopupComponent } from './company-status-delete-dialog.component';
import { ICompanyStatus } from 'app/shared/model/company-status.model';

@Injectable({ providedIn: 'root' })
export class CompanyStatusResolve implements Resolve<ICompanyStatus> {
    constructor(private service: CompanyStatusService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICompanyStatus> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CompanyStatus>) => response.ok),
                map((companyStatus: HttpResponse<CompanyStatus>) => companyStatus.body)
            );
        }
        return of(new CompanyStatus());
    }
}

export const companyStatusRoute: Routes = [
    {
        path: '',
        component: CompanyStatusComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanyStatuses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CompanyStatusDetailComponent,
        resolve: {
            companyStatus: CompanyStatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanyStatuses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CompanyStatusUpdateComponent,
        resolve: {
            companyStatus: CompanyStatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanyStatuses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CompanyStatusUpdateComponent,
        resolve: {
            companyStatus: CompanyStatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanyStatuses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const companyStatusPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CompanyStatusDeletePopupComponent,
        resolve: {
            companyStatus: CompanyStatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanyStatuses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
