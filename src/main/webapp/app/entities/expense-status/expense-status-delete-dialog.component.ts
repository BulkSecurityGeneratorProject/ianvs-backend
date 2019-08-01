import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExpenseStatus } from 'app/shared/model/expense-status.model';
import { ExpenseStatusService } from './expense-status.service';

@Component({
    selector: 'jhi-expense-status-delete-dialog',
    templateUrl: './expense-status-delete-dialog.component.html'
})
export class ExpenseStatusDeleteDialogComponent {
    expenseStatus: IExpenseStatus;

    constructor(
        protected expenseStatusService: ExpenseStatusService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.expenseStatusService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'expenseStatusListModification',
                content: 'Deleted an expenseStatus'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-expense-status-delete-popup',
    template: ''
})
export class ExpenseStatusDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ expenseStatus }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ExpenseStatusDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.expenseStatus = expenseStatus;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/expense-status', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/expense-status', { outlets: { popup: null } }]);
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
