import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ICompanyStatus } from 'app/shared/model/company-status.model';
import { CompanyStatusService } from './company-status.service';

@Component({
    selector: 'jhi-company-status-update',
    templateUrl: './company-status-update.component.html'
})
export class CompanyStatusUpdateComponent implements OnInit {
    companyStatus: ICompanyStatus;
    isSaving: boolean;

    constructor(protected companyStatusService: CompanyStatusService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ companyStatus }) => {
            this.companyStatus = companyStatus;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.companyStatus.id !== undefined) {
            this.subscribeToSaveResponse(this.companyStatusService.update(this.companyStatus));
        } else {
            this.subscribeToSaveResponse(this.companyStatusService.create(this.companyStatus));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompanyStatus>>) {
        result.subscribe((res: HttpResponse<ICompanyStatus>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
