/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IanvsTestModule } from '../../../test.module';
import { ExpenseStatusDeleteDialogComponent } from 'app/entities/expense-status/expense-status-delete-dialog.component';
import { ExpenseStatusService } from 'app/entities/expense-status/expense-status.service';

describe('Component Tests', () => {
    describe('ExpenseStatus Management Delete Component', () => {
        let comp: ExpenseStatusDeleteDialogComponent;
        let fixture: ComponentFixture<ExpenseStatusDeleteDialogComponent>;
        let service: ExpenseStatusService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [ExpenseStatusDeleteDialogComponent]
            })
                .overrideTemplate(ExpenseStatusDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ExpenseStatusDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpenseStatusService);
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
