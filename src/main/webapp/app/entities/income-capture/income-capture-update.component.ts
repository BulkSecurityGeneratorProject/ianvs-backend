import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IIncomeCapture } from 'app/shared/model/income-capture.model';
import { IncomeCaptureService } from './income-capture.service';
import { IBranch } from 'app/shared/model/branch.model';
import { BranchService } from 'app/entities/branch';
import { IIncomeCategory } from 'app/shared/model/income-category.model';
import { IncomeCategoryService } from 'app/entities/income-category';

@Component({
    selector: 'jhi-income-capture-update',
    templateUrl: './income-capture-update.component.html'
})
export class IncomeCaptureUpdateComponent implements OnInit {
    incomeCapture: IIncomeCapture;
    isSaving: boolean;

    branches: IBranch[];

    incomecategories: IIncomeCategory[];
    documentDate: string;
    dateUploaded: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected incomeCaptureService: IncomeCaptureService,
        protected branchService: BranchService,
        protected incomeCategoryService: IncomeCategoryService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ incomeCapture }) => {
            this.incomeCapture = incomeCapture;
            this.documentDate = this.incomeCapture.documentDate != null ? this.incomeCapture.documentDate.format(DATE_TIME_FORMAT) : null;
            this.dateUploaded = this.incomeCapture.dateUploaded != null ? this.incomeCapture.dateUploaded.format(DATE_TIME_FORMAT) : null;
        });
        this.branchService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IBranch[]>) => mayBeOk.ok),
                map((response: HttpResponse<IBranch[]>) => response.body)
            )
            .subscribe((res: IBranch[]) => (this.branches = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.incomeCategoryService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IIncomeCategory[]>) => mayBeOk.ok),
                map((response: HttpResponse<IIncomeCategory[]>) => response.body)
            )
            .subscribe((res: IIncomeCategory[]) => (this.incomecategories = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.incomeCapture.documentDate = this.documentDate != null ? moment(this.documentDate, DATE_TIME_FORMAT) : null;
        this.incomeCapture.dateUploaded = this.dateUploaded != null ? moment(this.dateUploaded, DATE_TIME_FORMAT) : null;
        if (this.incomeCapture.id !== undefined) {
            this.subscribeToSaveResponse(this.incomeCaptureService.update(this.incomeCapture));
        } else {
            this.subscribeToSaveResponse(this.incomeCaptureService.create(this.incomeCapture));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IIncomeCapture>>) {
        result.subscribe((res: HttpResponse<IIncomeCapture>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackIncomeCategoryById(index: number, item: IIncomeCategory) {
        return item.id;
    }
}
