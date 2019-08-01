import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IExpenseCategory } from 'app/shared/model/expense-category.model';
import { ExpenseCategoryService } from './expense-category.service';

@Component({
    selector: 'jhi-expense-category-update',
    templateUrl: './expense-category-update.component.html'
})
export class ExpenseCategoryUpdateComponent implements OnInit {
    expenseCategory: IExpenseCategory;
    isSaving: boolean;

    constructor(protected expenseCategoryService: ExpenseCategoryService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ expenseCategory }) => {
            this.expenseCategory = expenseCategory;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.expenseCategory.id !== undefined) {
            this.subscribeToSaveResponse(this.expenseCategoryService.update(this.expenseCategory));
        } else {
            this.subscribeToSaveResponse(this.expenseCategoryService.create(this.expenseCategory));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IExpenseCategory>>) {
        result.subscribe((res: HttpResponse<IExpenseCategory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
