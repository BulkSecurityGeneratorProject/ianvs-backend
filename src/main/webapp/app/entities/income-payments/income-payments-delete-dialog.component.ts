import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIncomePayments } from 'app/shared/model/income-payments.model';
import { IncomePaymentsService } from './income-payments.service';

@Component({
    selector: 'jhi-income-payments-delete-dialog',
    templateUrl: './income-payments-delete-dialog.component.html'
})
export class IncomePaymentsDeleteDialogComponent {
    incomePayments: IIncomePayments;

    constructor(
        protected incomePaymentsService: IncomePaymentsService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.incomePaymentsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'incomePaymentsListModification',
                content: 'Deleted an incomePayments'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-income-payments-delete-popup',
    template: ''
})
export class IncomePaymentsDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ incomePayments }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(IncomePaymentsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.incomePayments = incomePayments;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/income-payments', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/income-payments', { outlets: { popup: null } }]);
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
