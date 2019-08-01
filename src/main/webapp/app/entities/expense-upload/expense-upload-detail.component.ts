import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IExpenseUpload } from 'app/shared/model/expense-upload.model';

@Component({
    selector: 'jhi-expense-upload-detail',
    templateUrl: './expense-upload-detail.component.html'
})
export class ExpenseUploadDetailComponent implements OnInit {
    expenseUpload: IExpenseUpload;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ expenseUpload }) => {
            this.expenseUpload = expenseUpload;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
