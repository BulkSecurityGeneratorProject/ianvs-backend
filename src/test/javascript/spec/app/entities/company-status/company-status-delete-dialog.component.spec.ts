/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IanvsTestModule } from '../../../test.module';
import { CompanyStatusDeleteDialogComponent } from 'app/entities/company-status/company-status-delete-dialog.component';
import { CompanyStatusService } from 'app/entities/company-status/company-status.service';

describe('Component Tests', () => {
    describe('CompanyStatus Management Delete Component', () => {
        let comp: CompanyStatusDeleteDialogComponent;
        let fixture: ComponentFixture<CompanyStatusDeleteDialogComponent>;
        let service: CompanyStatusService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [CompanyStatusDeleteDialogComponent]
            })
                .overrideTemplate(CompanyStatusDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CompanyStatusDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyStatusService);
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
