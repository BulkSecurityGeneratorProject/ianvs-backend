/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IanvsTestModule } from '../../../test.module';
import { ExpenseUploadDeleteDialogComponent } from 'app/entities/expense-upload/expense-upload-delete-dialog.component';
import { ExpenseUploadService } from 'app/entities/expense-upload/expense-upload.service';

describe('Component Tests', () => {
    describe('ExpenseUpload Management Delete Component', () => {
        let comp: ExpenseUploadDeleteDialogComponent;
        let fixture: ComponentFixture<ExpenseUploadDeleteDialogComponent>;
        let service: ExpenseUploadService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [ExpenseUploadDeleteDialogComponent]
            })
                .overrideTemplate(ExpenseUploadDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ExpenseUploadDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpenseUploadService);
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
