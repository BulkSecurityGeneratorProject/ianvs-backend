import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IExpenseStatus } from 'app/shared/model/expense-status.model';
import { ExpenseStatusService } from './expense-status.service';

@Component({
    selector: 'jhi-expense-status-update',
    templateUrl: './expense-status-update.component.html'
})
export class ExpenseStatusUpdateComponent implements OnInit {
    expenseStatus: IExpenseStatus;
    isSaving: boolean;

    constructor(protected expenseStatusService: ExpenseStatusService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ expenseStatus }) => {
            this.expenseStatus = expenseStatus;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.expenseStatus.id !== undefined) {
            this.subscribeToSaveResponse(this.expenseStatusService.update(this.expenseStatus));
        } else {
            this.subscribeToSaveResponse(this.expenseStatusService.create(this.expenseStatus));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IExpenseStatus>>) {
        result.subscribe((res: HttpResponse<IExpenseStatus>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
