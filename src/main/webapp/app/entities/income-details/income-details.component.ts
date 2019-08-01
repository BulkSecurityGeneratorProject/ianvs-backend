import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IIncomeDetails } from 'app/shared/model/income-details.model';
import { AccountService } from 'app/core';
import { IncomeDetailsService } from './income-details.service';

@Component({
    selector: 'jhi-income-details',
    templateUrl: './income-details.component.html'
})
export class IncomeDetailsComponent implements OnInit, OnDestroy {
    incomeDetails: IIncomeDetails[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected incomeDetailsService: IncomeDetailsService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.incomeDetailsService
            .query()
            .pipe(
                filter((res: HttpResponse<IIncomeDetails[]>) => res.ok),
                map((res: HttpResponse<IIncomeDetails[]>) => res.body)
            )
            .subscribe(
                (res: IIncomeDetails[]) => {
                    this.incomeDetails = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInIncomeDetails();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IIncomeDetails) {
        return item.id;
    }

    registerChangeInIncomeDetails() {
        this.eventSubscriber = this.eventManager.subscribe('incomeDetailsListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
