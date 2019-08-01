import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIncomeCategory } from 'app/shared/model/income-category.model';
import { IncomeCategoryService } from './income-category.service';

@Component({
    selector: 'jhi-income-category-delete-dialog',
    templateUrl: './income-category-delete-dialog.component.html'
})
export class IncomeCategoryDeleteDialogComponent {
    incomeCategory: IIncomeCategory;

    constructor(
        protected incomeCategoryService: IncomeCategoryService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.incomeCategoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'incomeCategoryListModification',
                content: 'Deleted an incomeCategory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-income-category-delete-popup',
    template: ''
})
export class IncomeCategoryDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ incomeCategory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(IncomeCategoryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.incomeCategory = incomeCategory;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/income-category', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/income-category', { outlets: { popup: null } }]);
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
