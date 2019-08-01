import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIncomeCapture } from 'app/shared/model/income-capture.model';
import { IncomeCaptureService } from './income-capture.service';

@Component({
    selector: 'jhi-income-capture-delete-dialog',
    templateUrl: './income-capture-delete-dialog.component.html'
})
export class IncomeCaptureDeleteDialogComponent {
    incomeCapture: IIncomeCapture;

    constructor(
        protected incomeCaptureService: IncomeCaptureService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.incomeCaptureService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'incomeCaptureListModification',
                content: 'Deleted an incomeCapture'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-income-capture-delete-popup',
    template: ''
})
export class IncomeCaptureDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ incomeCapture }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(IncomeCaptureDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.incomeCapture = incomeCapture;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/income-capture', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/income-capture', { outlets: { popup: null } }]);
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
