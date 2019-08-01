import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompanyCategory } from 'app/shared/model/company-category.model';

@Component({
    selector: 'jhi-company-category-detail',
    templateUrl: './company-category-detail.component.html'
})
export class CompanyCategoryDetailComponent implements OnInit {
    companyCategory: ICompanyCategory;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ companyCategory }) => {
            this.companyCategory = companyCategory;
        });
    }

    previousState() {
        window.history.back();
    }
}
