import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompanyStatus } from 'app/shared/model/company-status.model';

@Component({
    selector: 'jhi-company-status-detail',
    templateUrl: './company-status-detail.component.html'
})
export class CompanyStatusDetailComponent implements OnInit {
    companyStatus: ICompanyStatus;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ companyStatus }) => {
            this.companyStatus = companyStatus;
        });
    }

    previousState() {
        window.history.back();
    }
}
