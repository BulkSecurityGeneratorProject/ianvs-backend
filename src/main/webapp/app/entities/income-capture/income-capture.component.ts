import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IIncomeCapture } from 'app/shared/model/income-capture.model';
import { AccountService } from 'app/core';
import { IncomeCaptureService } from './income-capture.service';

@Component({
    selector: 'jhi-income-capture',
    templateUrl: './income-capture.component.html'
})
export class IncomeCaptureComponent implements OnInit, OnDestroy {
    incomeCaptures: IIncomeCapture[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected incomeCaptureService: IncomeCaptureService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.incomeCaptureService
            .query()
            .pipe(
                filter((res: HttpResponse<IIncomeCapture[]>) => res.ok),
                map((res: HttpResponse<IIncomeCapture[]>) => res.body)
            )
            .subscribe(
                (res: IIncomeCapture[]) => {
                    this.incomeCaptures = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInIncomeCaptures();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IIncomeCapture) {
        return item.id;
    }

    registerChangeInIncomeCaptures() {
        this.eventSubscriber = this.eventManager.subscribe('incomeCaptureListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
