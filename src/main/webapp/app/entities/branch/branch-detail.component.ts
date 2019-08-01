import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBranch } from 'app/shared/model/branch.model';

@Component({
    selector: 'jhi-branch-detail',
    templateUrl: './branch-detail.component.html'
})
export class BranchDetailComponent implements OnInit {
    branch: IBranch;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ branch }) => {
            this.branch = branch;
        });
    }

    previousState() {
        window.history.back();
    }
}
