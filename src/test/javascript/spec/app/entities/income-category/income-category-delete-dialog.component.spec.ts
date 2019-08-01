/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IanvsTestModule } from '../../../test.module';
import { IncomeCategoryDeleteDialogComponent } from 'app/entities/income-category/income-category-delete-dialog.component';
import { IncomeCategoryService } from 'app/entities/income-category/income-category.service';

describe('Component Tests', () => {
    describe('IncomeCategory Management Delete Component', () => {
        let comp: IncomeCategoryDeleteDialogComponent;
        let fixture: ComponentFixture<IncomeCategoryDeleteDialogComponent>;
        let service: IncomeCategoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [IncomeCategoryDeleteDialogComponent]
            })
                .overrideTemplate(IncomeCategoryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IncomeCategoryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncomeCategoryService);
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
