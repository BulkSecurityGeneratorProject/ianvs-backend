import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExpenseCategory } from 'app/shared/model/expense-category.model';

@Component({
    selector: 'jhi-expense-category-detail',
    templateUrl: './expense-category-detail.component.html'
})
export class ExpenseCategoryDetailComponent implements OnInit {
    expenseCategory: IExpenseCategory;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ expenseCategory }) => {
            this.expenseCategory = expenseCategory;
        });
    }

    previousState() {
        window.history.back();
    }
}
