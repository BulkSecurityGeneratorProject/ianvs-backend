/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IanvsTestModule } from '../../../test.module';
import { IncomePaymentsDeleteDialogComponent } from 'app/entities/income-payments/income-payments-delete-dialog.component';
import { IncomePaymentsService } from 'app/entities/income-payments/income-payments.service';

describe('Component Tests', () => {
    describe('IncomePayments Management Delete Component', () => {
        let comp: IncomePaymentsDeleteDialogComponent;
        let fixture: ComponentFixture<IncomePaymentsDeleteDialogComponent>;
        let service: IncomePaymentsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [IncomePaymentsDeleteDialogComponent]
            })
                .overrideTemplate(IncomePaymentsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IncomePaymentsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncomePaymentsService);
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
