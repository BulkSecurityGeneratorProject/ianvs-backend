import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIncomeCapture } from 'app/shared/model/income-capture.model';

@Component({
    selector: 'jhi-income-capture-detail',
    templateUrl: './income-capture-detail.component.html'
})
export class IncomeCaptureDetailComponent implements OnInit {
    incomeCapture: IIncomeCapture;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ incomeCapture }) => {
            this.incomeCapture = incomeCapture;
        });
    }

    previousState() {
        window.history.back();
    }
}
