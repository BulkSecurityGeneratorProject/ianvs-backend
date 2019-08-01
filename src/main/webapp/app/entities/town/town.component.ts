import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITown } from 'app/shared/model/town.model';
import { AccountService } from 'app/core';
import { TownService } from './town.service';

@Component({
    selector: 'jhi-town',
    templateUrl: './town.component.html'
})
export class TownComponent implements OnInit, OnDestroy {
    towns: ITown[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected townService: TownService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.townService
            .query()
            .pipe(
                filter((res: HttpResponse<ITown[]>) => res.ok),
                map((res: HttpResponse<ITown[]>) => res.body)
            )
            .subscribe(
                (res: ITown[]) => {
                    this.towns = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTowns();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITown) {
        return item.id;
    }

    registerChangeInTowns() {
        this.eventSubscriber = this.eventManager.subscribe('townListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
