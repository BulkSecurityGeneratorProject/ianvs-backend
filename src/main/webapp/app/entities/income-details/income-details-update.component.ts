import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IIncomeDetails } from 'app/shared/model/income-details.model';
import { IncomeDetailsService } from './income-details.service';
import { IIncomeCapture } from 'app/shared/model/income-capture.model';
import { IncomeCaptureService } from 'app/entities/income-capture';

@Component({
    selector: 'jhi-income-details-update',
    templateUrl: './income-details-update.component.html'
})
export class IncomeDetailsUpdateComponent implements OnInit {
    incomeDetails: IIncomeDetails;
    isSaving: boolean;

    incomecaptures: IIncomeCapture[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected incomeDetailsService: IncomeDetailsService,
        protected incomeCaptureService: IncomeCaptureService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ incomeDetails }) => {
            this.incomeDetails = incomeDetails;
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
        if (this.incomeDetails.id !== undefined) {
            this.subscribeToSaveResponse(this.incomeDetailsService.update(this.incomeDetails));
        } else {
            this.subscribeToSaveResponse(this.incomeDetailsService.create(this.incomeDetails));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IIncomeDetails>>) {
        result.subscribe((res: HttpResponse<IIncomeDetails>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
