import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IIncomeCategory } from 'app/shared/model/income-category.model';
import { AccountService } from 'app/core';
import { IncomeCategoryService } from './income-category.service';

@Component({
    selector: 'jhi-income-category',
    templateUrl: './income-category.component.html'
})
export class IncomeCategoryComponent implements OnInit, OnDestroy {
    incomeCategories: IIncomeCategory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected incomeCategoryService: IncomeCategoryService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.incomeCategoryService
            .query()
            .pipe(
                filter((res: HttpResponse<IIncomeCategory[]>) => res.ok),
                map((res: HttpResponse<IIncomeCategory[]>) => res.body)
            )
            .subscribe(
                (res: IIncomeCategory[]) => {
                    this.incomeCategories = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInIncomeCategories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IIncomeCategory) {
        return item.id;
    }

    registerChangeInIncomeCategories() {
        this.eventSubscriber = this.eventManager.subscribe('incomeCategoryListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
