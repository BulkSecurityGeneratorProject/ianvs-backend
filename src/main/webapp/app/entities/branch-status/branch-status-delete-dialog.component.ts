import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBranchStatus } from 'app/shared/model/branch-status.model';
import { BranchStatusService } from './branch-status.service';

@Component({
    selector: 'jhi-branch-status-delete-dialog',
    templateUrl: './branch-status-delete-dialog.component.html'
})
export class BranchStatusDeleteDialogComponent {
    branchStatus: IBranchStatus;

    constructor(
        protected branchStatusService: BranchStatusService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.branchStatusService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'branchStatusListModification',
                content: 'Deleted an branchStatus'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-branch-status-delete-popup',
    template: ''
})
export class BranchStatusDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ branchStatus }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BranchStatusDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.branchStatus = branchStatus;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/branch-status', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/branch-status', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
