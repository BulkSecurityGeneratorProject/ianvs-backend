import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICompanyCategory } from 'app/shared/model/company-category.model';
import { CompanyCategoryService } from './company-category.service';

@Component({
    selector: 'jhi-company-category-delete-dialog',
    templateUrl: './company-category-delete-dialog.component.html'
})
export class CompanyCategoryDeleteDialogComponent {
    companyCategory: ICompanyCategory;

    constructor(
        protected companyCategoryService: CompanyCategoryService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.companyCategoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'companyCategoryListModification',
                content: 'Deleted an companyCategory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-company-category-delete-popup',
    template: ''
})
export class CompanyCategoryDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ companyCategory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CompanyCategoryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.companyCategory = companyCategory;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/company-category', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/company-category', { outlets: { popup: null } }]);
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
