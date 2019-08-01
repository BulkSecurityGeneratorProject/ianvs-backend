import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBranch } from 'app/shared/model/branch.model';
import { AccountService } from 'app/core';
import { BranchService } from './branch.service';

@Component({
    selector: 'jhi-branch',
    templateUrl: './branch.component.html'
})
export class BranchComponent implements OnInit, OnDestroy {
    branches: IBranch[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected branchService: BranchService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.branchService
            .query()
            .pipe(
                filter((res: HttpResponse<IBranch[]>) => res.ok),
                map((res: HttpResponse<IBranch[]>) => res.body)
            )
            .subscribe(
                (res: IBranch[]) => {
                    this.branches = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBranches();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBranch) {
        return item.id;
    }

    registerChangeInBranches() {
        this.eventSubscriber = this.eventManager.subscribe('branchListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
