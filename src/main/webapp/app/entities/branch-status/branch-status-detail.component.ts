import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBranchStatus } from 'app/shared/model/branch-status.model';

@Component({
    selector: 'jhi-branch-status-detail',
    templateUrl: './branch-status-detail.component.html'
})
export class BranchStatusDetailComponent implements OnInit {
    branchStatus: IBranchStatus;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ branchStatus }) => {
            this.branchStatus = branchStatus;
        });
    }

    previousState() {
        window.history.back();
    }
}
