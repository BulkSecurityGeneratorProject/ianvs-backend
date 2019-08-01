import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITown } from 'app/shared/model/town.model';
import { TownService } from './town.service';

@Component({
    selector: 'jhi-town-delete-dialog',
    templateUrl: './town-delete-dialog.component.html'
})
export class TownDeleteDialogComponent {
    town: ITown;

    constructor(protected townService: TownService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.townService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'townListModification',
                content: 'Deleted an town'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-town-delete-popup',
    template: ''
})
export class TownDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ town }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TownDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.town = town;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/town', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/town', { outlets: { popup: null } }]);
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
