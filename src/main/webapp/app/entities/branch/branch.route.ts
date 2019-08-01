import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Branch } from 'app/shared/model/branch.model';
import { BranchService } from './branch.service';
import { BranchComponent } from './branch.component';
import { BranchDetailComponent } from './branch-detail.component';
import { BranchUpdateComponent } from './branch-update.component';
import { BranchDeletePopupComponent } from './branch-delete-dialog.component';
import { IBranch } from 'app/shared/model/branch.model';

@Injectable({ providedIn: 'root' })
export class BranchResolve implements Resolve<IBranch> {
    constructor(private service: BranchService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBranch> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Branch>) => response.ok),
                map((branch: HttpResponse<Branch>) => branch.body)
            );
        }
        return of(new Branch());
    }
}

export const branchRoute: Routes = [
    {
        path: '',
        component: BranchComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Branches'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: BranchDetailComponent,
        resolve: {
            branch: BranchResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Branches'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: BranchUpdateComponent,
        resolve: {
            branch: BranchResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Branches'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: BranchUpdateComponent,
        resolve: {
            branch: BranchResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Branches'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const branchPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: BranchDeletePopupComponent,
        resolve: {
            branch: BranchResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Branches'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
