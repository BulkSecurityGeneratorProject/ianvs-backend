import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIncomeDetails } from 'app/shared/model/income-details.model';

@Component({
    selector: 'jhi-income-details-detail',
    templateUrl: './income-details-detail.component.html'
})
export class IncomeDetailsDetailComponent implements OnInit {
    incomeDetails: IIncomeDetails;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ incomeDetails }) => {
            this.incomeDetails = incomeDetails;
        });
    }

    previousState() {
        window.history.back();
    }
}
