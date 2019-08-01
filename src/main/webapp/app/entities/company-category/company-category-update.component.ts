import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ICompanyCategory } from 'app/shared/model/company-category.model';
import { CompanyCategoryService } from './company-category.service';

@Component({
    selector: 'jhi-company-category-update',
    templateUrl: './company-category-update.component.html'
})
export class CompanyCategoryUpdateComponent implements OnInit {
    companyCategory: ICompanyCategory;
    isSaving: boolean;

    constructor(protected companyCategoryService: CompanyCategoryService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ companyCategory }) => {
            this.companyCategory = companyCategory;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.companyCategory.id !== undefined) {
            this.subscribeToSaveResponse(this.companyCategoryService.update(this.companyCategory));
        } else {
            this.subscribeToSaveResponse(this.companyCategoryService.create(this.companyCategory));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompanyCategory>>) {
        result.subscribe((res: HttpResponse<ICompanyCategory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
