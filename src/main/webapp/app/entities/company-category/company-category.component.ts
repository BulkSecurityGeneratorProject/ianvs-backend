import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICompanyCategory } from 'app/shared/model/company-category.model';
import { AccountService } from 'app/core';
import { CompanyCategoryService } from './company-category.service';

@Component({
    selector: 'jhi-company-category',
    templateUrl: './company-category.component.html'
})
export class CompanyCategoryComponent implements OnInit, OnDestroy {
    companyCategories: ICompanyCategory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected companyCategoryService: CompanyCategoryService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.companyCategoryService
            .query()
            .pipe(
                filter((res: HttpResponse<ICompanyCategory[]>) => res.ok),
                map((res: HttpResponse<ICompanyCategory[]>) => res.body)
            )
            .subscribe(
                (res: ICompanyCategory[]) => {
                    this.companyCategories = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCompanyCategories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICompanyCategory) {
        return item.id;
    }

    registerChangeInCompanyCategories() {
        this.eventSubscriber = this.eventManager.subscribe('companyCategoryListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
