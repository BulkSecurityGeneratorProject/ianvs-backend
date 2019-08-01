import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIncomeCategory } from 'app/shared/model/income-category.model';

@Component({
    selector: 'jhi-income-category-detail',
    templateUrl: './income-category-detail.component.html'
})
export class IncomeCategoryDetailComponent implements OnInit {
    incomeCategory: IIncomeCategory;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ incomeCategory }) => {
            this.incomeCategory = incomeCategory;
        });
    }

    previousState() {
        window.history.back();
    }
}
