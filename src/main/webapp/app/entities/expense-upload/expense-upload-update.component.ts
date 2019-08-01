import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IExpenseUpload } from 'app/shared/model/expense-upload.model';
import { ExpenseUploadService } from './expense-upload.service';
import { IBranch } from 'app/shared/model/branch.model';
import { BranchService } from 'app/entities/branch';
import { IExpenseStatus } from 'app/shared/model/expense-status.model';
import { ExpenseStatusService } from 'app/entities/expense-status';
import { IExpenseCategory } from 'app/shared/model/expense-category.model';
import { ExpenseCategoryService } from 'app/entities/expense-category';

@Component({
    selector: 'jhi-expense-upload-update',
    templateUrl: './expense-upload-update.component.html'
})
export class ExpenseUploadUpdateComponent implements OnInit {
    expenseUpload: IExpenseUpload;
    isSaving: boolean;

    branches: IBranch[];

    expensestatuses: IExpenseStatus[];

    expensecategories: IExpenseCategory[];
    statusDate: string;
    dateCreated: string;
    accountingDate: string;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected expenseUploadService: ExpenseUploadService,
        protected branchService: BranchService,
        protected expenseStatusService: ExpenseStatusService,
        protected expenseCategoryService: ExpenseCategoryService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ expenseUpload }) => {
            this.expenseUpload = expenseUpload;
            this.statusDate = this.expenseUpload.statusDate != null ? this.expenseUpload.statusDate.format(DATE_TIME_FORMAT) : null;
            this.dateCreated = this.expenseUpload.dateCreated != null ? this.expenseUpload.dateCreated.format(DATE_TIME_FORMAT) : null;
            this.accountingDate =
                this.expenseUpload.accountingDate != null ? this.expenseUpload.accountingDate.format(DATE_TIME_FORMAT) : null;
        });
        this.branchService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IBranch[]>) => mayBeOk.ok),
                map((response: HttpResponse<IBranch[]>) => response.body)
            )
            .subscribe((res: IBranch[]) => (this.branches = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.expenseStatusService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IExpenseStatus[]>) => mayBeOk.ok),
                map((response: HttpResponse<IExpenseStatus[]>) => response.body)
            )
            .subscribe((res: IExpenseStatus[]) => (this.expensestatuses = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.expenseCategoryService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IExpenseCategory[]>) => mayBeOk.ok),
                map((response: HttpResponse<IExpenseCategory[]>) => response.body)
            )
            .subscribe((res: IExpenseCategory[]) => (this.expensecategories = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.expenseUpload.statusDate = this.statusDate != null ? moment(this.statusDate, DATE_TIME_FORMAT) : null;
        this.expenseUpload.dateCreated = this.dateCreated != null ? moment(this.dateCreated, DATE_TIME_FORMAT) : null;
        this.expenseUpload.accountingDate = this.accountingDate != null ? moment(this.accountingDate, DATE_TIME_FORMAT) : null;
        if (this.expenseUpload.id !== undefined) {
            this.subscribeToSaveResponse(this.expenseUploadService.update(this.expenseUpload));
        } else {
            this.subscribeToSaveResponse(this.expenseUploadService.create(this.expenseUpload));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IExpenseUpload>>) {
        result.subscribe((res: HttpResponse<IExpenseUpload>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackBranchById(index: number, item: IBranch) {
        return item.id;
    }

    trackExpenseStatusById(index: number, item: IExpenseStatus) {
        return item.id;
    }

    trackExpenseCategoryById(index: number, item: IExpenseCategory) {
        return item.id;
    }
}
