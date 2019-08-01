import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExpenseUpload } from 'app/shared/model/expense-upload.model';
import { ExpenseUploadService } from './expense-upload.service';

@Component({
    selector: 'jhi-expense-upload-delete-dialog',
    templateUrl: './expense-upload-delete-dialog.component.html'
})
export class ExpenseUploadDeleteDialogComponent {
    expenseUpload: IExpenseUpload;

    constructor(
        protected expenseUploadService: ExpenseUploadService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.expenseUploadService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'expenseUploadListModification',
                content: 'Deleted an expenseUpload'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-expense-upload-delete-popup',
    template: ''
})
export class ExpenseUploadDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ expenseUpload }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ExpenseUploadDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.expenseUpload = expenseUpload;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/expense-upload', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/expense-upload', { outlets: { popup: null } }]);
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
