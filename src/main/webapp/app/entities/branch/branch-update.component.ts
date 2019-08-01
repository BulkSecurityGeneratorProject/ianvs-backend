import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IBranch } from 'app/shared/model/branch.model';
import { BranchService } from './branch.service';
import { ITown } from 'app/shared/model/town.model';
import { TownService } from 'app/entities/town';
import { ICompany } from 'app/shared/model/company.model';
import { CompanyService } from 'app/entities/company';
import { IBranchStatus } from 'app/shared/model/branch-status.model';
import { BranchStatusService } from 'app/entities/branch-status';

@Component({
    selector: 'jhi-branch-update',
    templateUrl: './branch-update.component.html'
})
export class BranchUpdateComponent implements OnInit {
    branch: IBranch;
    isSaving: boolean;

    towns: ITown[];

    companies: ICompany[];

    branchstatuses: IBranchStatus[];
    registrationDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected branchService: BranchService,
        protected townService: TownService,
        protected companyService: CompanyService,
        protected branchStatusService: BranchStatusService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ branch }) => {
            this.branch = branch;
            this.registrationDate = this.branch.registrationDate != null ? this.branch.registrationDate.format(DATE_TIME_FORMAT) : null;
        });
        this.townService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITown[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITown[]>) => response.body)
            )
            .subscribe((res: ITown[]) => (this.towns = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.companyService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICompany[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICompany[]>) => response.body)
            )
            .subscribe((res: ICompany[]) => (this.companies = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.branchStatusService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IBranchStatus[]>) => mayBeOk.ok),
                map((response: HttpResponse<IBranchStatus[]>) => response.body)
            )
            .subscribe((res: IBranchStatus[]) => (this.branchstatuses = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.branch.registrationDate = this.registrationDate != null ? moment(this.registrationDate, DATE_TIME_FORMAT) : null;
        if (this.branch.id !== undefined) {
            this.subscribeToSaveResponse(this.branchService.update(this.branch));
        } else {
            this.subscribeToSaveResponse(this.branchService.create(this.branch));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBranch>>) {
        result.subscribe((res: HttpResponse<IBranch>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTownById(index: number, item: ITown) {
        return item.id;
    }

    trackCompanyById(index: number, item: ICompany) {
        return item.id;
    }

    trackBranchStatusById(index: number, item: IBranchStatus) {
        return item.id;
    }
}
