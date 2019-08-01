import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExpenseStatus } from 'app/shared/model/expense-status.model';

@Component({
    selector: 'jhi-expense-status-detail',
    templateUrl: './expense-status-detail.component.html'
})
export class ExpenseStatusDetailComponent implements OnInit {
    expenseStatus: IExpenseStatus;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ expenseStatus }) => {
            this.expenseStatus = expenseStatus;
        });
    }

    previousState() {
        window.history.back();
    }
}
