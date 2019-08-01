import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIncomePayments } from 'app/shared/model/income-payments.model';

@Component({
    selector: 'jhi-income-payments-detail',
    templateUrl: './income-payments-detail.component.html'
})
export class IncomePaymentsDetailComponent implements OnInit {
    incomePayments: IIncomePayments;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ incomePayments }) => {
            this.incomePayments = incomePayments;
        });
    }

    previousState() {
        window.history.back();
    }
}
