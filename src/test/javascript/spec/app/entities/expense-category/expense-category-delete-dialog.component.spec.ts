/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IanvsTestModule } from '../../../test.module';
import { ExpenseCategoryDeleteDialogComponent } from 'app/entities/expense-category/expense-category-delete-dialog.component';
import { ExpenseCategoryService } from 'app/entities/expense-category/expense-category.service';

describe('Component Tests', () => {
    describe('ExpenseCategory Management Delete Component', () => {
        let comp: ExpenseCategoryDeleteDialogComponent;
        let fixture: ComponentFixture<ExpenseCategoryDeleteDialogComponent>;
        let service: ExpenseCategoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [ExpenseCategoryDeleteDialogComponent]
            })
                .overrideTemplate(ExpenseCategoryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ExpenseCategoryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpenseCategoryService);
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
