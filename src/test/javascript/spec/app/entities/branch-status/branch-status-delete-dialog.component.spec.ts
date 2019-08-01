/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IanvsTestModule } from '../../../test.module';
import { BranchStatusDeleteDialogComponent } from 'app/entities/branch-status/branch-status-delete-dialog.component';
import { BranchStatusService } from 'app/entities/branch-status/branch-status.service';

describe('Component Tests', () => {
    describe('BranchStatus Management Delete Component', () => {
        let comp: BranchStatusDeleteDialogComponent;
        let fixture: ComponentFixture<BranchStatusDeleteDialogComponent>;
        let service: BranchStatusService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [BranchStatusDeleteDialogComponent]
            })
                .overrideTemplate(BranchStatusDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BranchStatusDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BranchStatusService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
