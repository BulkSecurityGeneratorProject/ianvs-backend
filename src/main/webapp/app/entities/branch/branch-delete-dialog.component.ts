import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBranch } from 'app/shared/model/branch.model';
import { BranchService } from './branch.service';

@Component({
    selector: 'jhi-branch-delete-dialog',
    templateUrl: './branch-delete-dialog.component.html'
})
export class BranchDeleteDialogComponent {
    branch: IBranch;

    constructor(protected branchService: BranchService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.branchService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'branchListModification',
                content: 'Deleted an branch'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-branch-delete-popup',
    template: ''
})
export class BranchDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ branch }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BranchDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.branch = branch;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/branch', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/branch', { outlets: { popup: null } }]);
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
