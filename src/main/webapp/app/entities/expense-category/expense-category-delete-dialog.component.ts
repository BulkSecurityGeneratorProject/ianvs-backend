import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExpenseCategory } from 'app/shared/model/expense-category.model';
import { ExpenseCategoryService } from './expense-category.service';

@Component({
    selector: 'jhi-expense-category-delete-dialog',
    templateUrl: './expense-category-delete-dialog.component.html'
})
export class ExpenseCategoryDeleteDialogComponent {
    expenseCategory: IExpenseCategory;

    constructor(
        protected expenseCategoryService: ExpenseCategoryService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.expenseCategoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'expenseCategoryListModification',
                content: 'Deleted an expenseCategory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-expense-category-delete-popup',
    template: ''
})
export class ExpenseCategoryDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ expenseCategory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ExpenseCategoryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.expenseCategory = expenseCategory;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/expense-category', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/expense-category', { outlets: { popup: null } }]);
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
