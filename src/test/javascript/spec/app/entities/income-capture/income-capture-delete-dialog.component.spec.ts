/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IanvsTestModule } from '../../../test.module';
import { IncomeCaptureDeleteDialogComponent } from 'app/entities/income-capture/income-capture-delete-dialog.component';
import { IncomeCaptureService } from 'app/entities/income-capture/income-capture.service';

describe('Component Tests', () => {
    describe('IncomeCapture Management Delete Component', () => {
        let comp: IncomeCaptureDeleteDialogComponent;
        let fixture: ComponentFixture<IncomeCaptureDeleteDialogComponent>;
        let service: IncomeCaptureService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [IncomeCaptureDeleteDialogComponent]
            })
                .overrideTemplate(IncomeCaptureDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IncomeCaptureDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncomeCaptureService);
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
