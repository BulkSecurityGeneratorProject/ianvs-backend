import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ICompany } from 'app/shared/model/company.model';
import { CompanyService } from './company.service';
import { ICompanyCategory } from 'app/shared/model/company-category.model';
import { CompanyCategoryService } from 'app/entities/company-category';
import { ICompanyStatus } from 'app/shared/model/company-status.model';
import { CompanyStatusService } from 'app/entities/company-status';

@Component({
    selector: 'jhi-company-update',
    templateUrl: './company-update.component.html'
})
export class CompanyUpdateComponent implements OnInit {
    company: ICompany;
    isSaving: boolean;

    companycategories: ICompanyCategory[];

    companystatuses: ICompanyStatus[];
    registrationDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected companyService: CompanyService,
        protected companyCategoryService: CompanyCategoryService,
        protected companyStatusService: CompanyStatusService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ company }) => {
            this.company = company;
            this.registrationDate = this.company.registrationDate != null ? this.company.registrationDate.format(DATE_TIME_FORMAT) : null;
        });
        this.companyCategoryService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICompanyCategory[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICompanyCategory[]>) => response.body)
            )
            .subscribe((res: ICompanyCategory[]) => (this.companycategories = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.companyStatusService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICompanyStatus[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICompanyStatus[]>) => response.body)
            )
            .subscribe((res: ICompanyStatus[]) => (this.companystatuses = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.company.registrationDate = this.registrationDate != null ? moment(this.registrationDate, DATE_TIME_FORMAT) : null;
        if (this.company.id !== undefined) {
            this.subscribeToSaveResponse(this.companyService.update(this.company));
        } else {
            this.subscribeToSaveResponse(this.companyService.create(this.company));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompany>>) {
        result.subscribe((res: HttpResponse<ICompany>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCompanyCategoryById(index: number, item: ICompanyCategory) {
        return item.id;
    }

    trackCompanyStatusById(index: number, item: ICompanyStatus) {
        return item.id;
    }
}
