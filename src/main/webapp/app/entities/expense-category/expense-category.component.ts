import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IExpenseCategory } from 'app/shared/model/expense-category.model';
import { AccountService } from 'app/core';
import { ExpenseCategoryService } from './expense-category.service';

@Component({
    selector: 'jhi-expense-category',
    templateUrl: './expense-category.component.html'
})
export class ExpenseCategoryComponent implements OnInit, OnDestroy {
    expenseCategories: IExpenseCategory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected expenseCategoryService: ExpenseCategoryService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.expenseCategoryService
            .query()
            .pipe(
                filter((res: HttpResponse<IExpenseCategory[]>) => res.ok),
                map((res: HttpResponse<IExpenseCategory[]>) => res.body)
            )
            .subscribe(
                (res: IExpenseCategory[]) => {
                    this.expenseCategories = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInExpenseCategories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IExpenseCategory) {
        return item.id;
    }

    registerChangeInExpenseCategories() {
        this.eventSubscriber = this.eventManager.subscribe('expenseCategoryListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
