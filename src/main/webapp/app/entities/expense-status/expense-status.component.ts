import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IExpenseStatus } from 'app/shared/model/expense-status.model';
import { AccountService } from 'app/core';
import { ExpenseStatusService } from './expense-status.service';

@Component({
    selector: 'jhi-expense-status',
    templateUrl: './expense-status.component.html'
})
export class ExpenseStatusComponent implements OnInit, OnDestroy {
    expenseStatuses: IExpenseStatus[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected expenseStatusService: ExpenseStatusService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.expenseStatusService
            .query()
            .pipe(
                filter((res: HttpResponse<IExpenseStatus[]>) => res.ok),
                map((res: HttpResponse<IExpenseStatus[]>) => res.body)
            )
            .subscribe(
                (res: IExpenseStatus[]) => {
                    this.expenseStatuses = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInExpenseStatuses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IExpenseStatus) {
        return item.id;
    }

    registerChangeInExpenseStatuses() {
        this.eventSubscriber = this.eventManager.subscribe('expenseStatusListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
