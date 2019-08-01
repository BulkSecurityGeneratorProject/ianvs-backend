import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBranchStatus } from 'app/shared/model/branch-status.model';
import { AccountService } from 'app/core';
import { BranchStatusService } from './branch-status.service';

@Component({
    selector: 'jhi-branch-status',
    templateUrl: './branch-status.component.html'
})
export class BranchStatusComponent implements OnInit, OnDestroy {
    branchStatuses: IBranchStatus[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected branchStatusService: BranchStatusService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.branchStatusService
            .query()
            .pipe(
                filter((res: HttpResponse<IBranchStatus[]>) => res.ok),
                map((res: HttpResponse<IBranchStatus[]>) => res.body)
            )
            .subscribe(
                (res: IBranchStatus[]) => {
                    this.branchStatuses = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBranchStatuses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBranchStatus) {
        return item.id;
    }

    registerChangeInBranchStatuses() {
        this.eventSubscriber = this.eventManager.subscribe('branchStatusListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
