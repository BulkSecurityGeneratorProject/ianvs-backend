import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IIncomePayments } from 'app/shared/model/income-payments.model';
import { AccountService } from 'app/core';
import { IncomePaymentsService } from './income-payments.service';

@Component({
    selector: 'jhi-income-payments',
    templateUrl: './income-payments.component.html'
})
export class IncomePaymentsComponent implements OnInit, OnDestroy {
    incomePayments: IIncomePayments[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected incomePaymentsService: IncomePaymentsService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.incomePaymentsService
            .query()
            .pipe(
                filter((res: HttpResponse<IIncomePayments[]>) => res.ok),
                map((res: HttpResponse<IIncomePayments[]>) => res.body)
            )
            .subscribe(
                (res: IIncomePayments[]) => {
                    this.incomePayments = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInIncomePayments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IIncomePayments) {
        return item.id;
    }

    registerChangeInIncomePayments() {
        this.eventSubscriber = this.eventManager.subscribe('incomePaymentsListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
