import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IIncomeCategory } from 'app/shared/model/income-category.model';
import { IncomeCategoryService } from './income-category.service';

@Component({
    selector: 'jhi-income-category-update',
    templateUrl: './income-category-update.component.html'
})
export class IncomeCategoryUpdateComponent implements OnInit {
    incomeCategory: IIncomeCategory;
    isSaving: boolean;

    constructor(protected incomeCategoryService: IncomeCategoryService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ incomeCategory }) => {
            this.incomeCategory = incomeCategory;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.incomeCategory.id !== undefined) {
            this.subscribeToSaveResponse(this.incomeCategoryService.update(this.incomeCategory));
        } else {
            this.subscribeToSaveResponse(this.incomeCategoryService.create(this.incomeCategory));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IIncomeCategory>>) {
        result.subscribe((res: HttpResponse<IIncomeCategory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
