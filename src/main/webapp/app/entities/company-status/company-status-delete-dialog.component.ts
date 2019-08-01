import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICompanyStatus } from 'app/shared/model/company-status.model';
import { CompanyStatusService } from './company-status.service';

@Component({
    selector: 'jhi-company-status-delete-dialog',
    templateUrl: './company-status-delete-dialog.component.html'
})
export class CompanyStatusDeleteDialogComponent {
    companyStatus: ICompanyStatus;

    constructor(
        protected companyStatusService: CompanyStatusService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.companyStatusService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'companyStatusListModification',
                content: 'Deleted an companyStatus'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-company-status-delete-popup',
    template: ''
})
export class CompanyStatusDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ companyStatus }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CompanyStatusDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.companyStatus = companyStatus;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/company-status', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/company-status', { outlets: { popup: null } }]);
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
