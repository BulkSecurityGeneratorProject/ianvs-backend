import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IIncomePayments } from 'app/shared/model/income-payments.model';
import { IncomePaymentsService } from './income-payments.service';
import { IIncomeCapture } from 'app/shared/model/income-capture.model';
import { IncomeCaptureService } from 'app/entities/income-capture';

@Component({
    selector: 'jhi-income-payments-update',
    templateUrl: './income-payments-update.component.html'
})
export class IncomePaymentsUpdateComponent implements OnInit {
    incomePayments: IIncomePayments;
    isSaving: boolean;

    incomecaptures: IIncomeCapture[];
    outstandingPaymentDateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected incomePaymentsService: IncomePaymentsService,
        protected incomeCaptureService: IncomeCaptureService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ incomePayments }) => {
            this.incomePayments = incomePayments;
        });
        this.incomeCaptureService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IIncomeCapture[]>) => mayBeOk.ok),
                map((response: HttpResponse<IIncomeCapture[]>) => response.body)
            )
            .subscribe((res: IIncomeCapture[]) => (this.incomecaptures = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.incomePayments.id !== undefined) {
            this.subscribeToSaveResponse(this.incomePaymentsService.update(this.incomePayments));
        } else {
            this.subscribeToSaveResponse(this.incomePaymentsService.create(this.incomePayments));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IIncomePayments>>) {
        result.subscribe((res: HttpResponse<IIncomePayments>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackIncomeCaptureById(index: number, item: IIncomeCapture) {
        return item.id;
    }
}
