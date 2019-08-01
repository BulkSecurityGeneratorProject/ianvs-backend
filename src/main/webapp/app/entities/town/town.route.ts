import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Town } from 'app/shared/model/town.model';
import { TownService } from './town.service';
import { TownComponent } from './town.component';
import { TownDetailComponent } from './town-detail.component';
import { TownUpdateComponent } from './town-update.component';
import { TownDeletePopupComponent } from './town-delete-dialog.component';
import { ITown } from 'app/shared/model/town.model';

@Injectable({ providedIn: 'root' })
export class TownResolve implements Resolve<ITown> {
    constructor(private service: TownService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITown> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Town>) => response.ok),
                map((town: HttpResponse<Town>) => town.body)
            );
        }
        return of(new Town());
    }
}

export const townRoute: Routes = [
    {
        path: '',
        component: TownComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Towns'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TownDetailComponent,
        resolve: {
            town: TownResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Towns'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TownUpdateComponent,
        resolve: {
            town: TownResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Towns'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TownUpdateComponent,
        resolve: {
            town: TownResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Towns'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const townPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TownDeletePopupComponent,
        resolve: {
            town: TownResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Towns'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
