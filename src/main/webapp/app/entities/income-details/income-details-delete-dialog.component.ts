import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIncomeDetails } from 'app/shared/model/income-details.model';
import { IncomeDetailsService } from './income-details.service';

@Component({
    selector: 'jhi-income-details-delete-dialog',
    templateUrl: './income-details-delete-dialog.component.html'
})
export class IncomeDetailsDeleteDialogComponent {
    incomeDetails: IIncomeDetails;

    constructor(
        protected incomeDetailsService: IncomeDetailsService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.incomeDetailsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'incomeDetailsListModification',
                content: 'Deleted an incomeDetails'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-income-details-delete-popup',
    template: ''
})
export class IncomeDetailsDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ incomeDetails }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(IncomeDetailsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.incomeDetails = incomeDetails;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/income-details', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/income-details', { outlets: { popup: null } }]);
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
