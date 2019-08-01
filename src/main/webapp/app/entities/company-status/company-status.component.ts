import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICompanyStatus } from 'app/shared/model/company-status.model';
import { AccountService } from 'app/core';
import { CompanyStatusService } from './company-status.service';

@Component({
    selector: 'jhi-company-status',
    templateUrl: './company-status.component.html'
})
export class CompanyStatusComponent implements OnInit, OnDestroy {
    companyStatuses: ICompanyStatus[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected companyStatusService: CompanyStatusService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.companyStatusService
            .query()
            .pipe(
                filter((res: HttpResponse<ICompanyStatus[]>) => res.ok),
                map((res: HttpResponse<ICompanyStatus[]>) => res.body)
            )
            .subscribe(
                (res: ICompanyStatus[]) => {
                    this.companyStatuses = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCompanyStatuses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICompanyStatus) {
        return item.id;
    }

    registerChangeInCompanyStatuses() {
        this.eventSubscriber = this.eventManager.subscribe('companyStatusListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
