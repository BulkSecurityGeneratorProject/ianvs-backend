import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IBranchStatus } from 'app/shared/model/branch-status.model';
import { BranchStatusService } from './branch-status.service';

@Component({
    selector: 'jhi-branch-status-update',
    templateUrl: './branch-status-update.component.html'
})
export class BranchStatusUpdateComponent implements OnInit {
    branchStatus: IBranchStatus;
    isSaving: boolean;

    constructor(protected branchStatusService: BranchStatusService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ branchStatus }) => {
            this.branchStatus = branchStatus;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.branchStatus.id !== undefined) {
            this.subscribeToSaveResponse(this.branchStatusService.update(this.branchStatus));
        } else {
            this.subscribeToSaveResponse(this.branchStatusService.create(this.branchStatus));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBranchStatus>>) {
        result.subscribe((res: HttpResponse<IBranchStatus>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
