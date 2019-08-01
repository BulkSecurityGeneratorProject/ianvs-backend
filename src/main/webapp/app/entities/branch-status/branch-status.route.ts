import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BranchStatus } from 'app/shared/model/branch-status.model';
import { BranchStatusService } from './branch-status.service';
import { BranchStatusComponent } from './branch-status.component';
import { BranchStatusDetailComponent } from './branch-status-detail.component';
import { BranchStatusUpdateComponent } from './branch-status-update.component';
import { BranchStatusDeletePopupComponent } from './branch-status-delete-dialog.component';
import { IBranchStatus } from 'app/shared/model/branch-status.model';

@Injectable({ providedIn: 'root' })
export class BranchStatusResolve implements Resolve<IBranchStatus> {
    constructor(private service: BranchStatusService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBranchStatus> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<BranchStatus>) => response.ok),
                map((branchStatus: HttpResponse<BranchStatus>) => branchStatus.body)
            );
        }
        return of(new BranchStatus());
    }
}

export const branchStatusRoute: Routes = [
    {
        path: '',
        component: BranchStatusComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BranchStatuses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: BranchStatusDetailComponent,
        resolve: {
            branchStatus: BranchStatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BranchStatuses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: BranchStatusUpdateComponent,
        resolve: {
            branchStatus: BranchStatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BranchStatuses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: BranchStatusUpdateComponent,
        resolve: {
            branchStatus: BranchStatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BranchStatuses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const branchStatusPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: BranchStatusDeletePopupComponent,
        resolve: {
            branchStatus: BranchStatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BranchStatuses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
