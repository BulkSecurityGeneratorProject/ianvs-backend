/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IanvsTestModule } from '../../../test.module';
import { CompanyCategoryDeleteDialogComponent } from 'app/entities/company-category/company-category-delete-dialog.component';
import { CompanyCategoryService } from 'app/entities/company-category/company-category.service';

describe('Component Tests', () => {
    describe('CompanyCategory Management Delete Component', () => {
        let comp: CompanyCategoryDeleteDialogComponent;
        let fixture: ComponentFixture<CompanyCategoryDeleteDialogComponent>;
        let service: CompanyCategoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [CompanyCategoryDeleteDialogComponent]
            })
                .overrideTemplate(CompanyCategoryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CompanyCategoryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyCategoryService);
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
