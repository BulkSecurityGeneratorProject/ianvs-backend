/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IanvsTestModule } from '../../../test.module';
import { BranchDeleteDialogComponent } from 'app/entities/branch/branch-delete-dialog.component';
import { BranchService } from 'app/entities/branch/branch.service';

describe('Component Tests', () => {
    describe('Branch Management Delete Component', () => {
        let comp: BranchDeleteDialogComponent;
        let fixture: ComponentFixture<BranchDeleteDialogComponent>;
        let service: BranchService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [BranchDeleteDialogComponent]
            })
                .overrideTemplate(BranchDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BranchDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BranchService);
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
