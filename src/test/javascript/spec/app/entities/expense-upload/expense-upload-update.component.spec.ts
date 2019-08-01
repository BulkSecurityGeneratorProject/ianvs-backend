/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IanvsTestModule } from '../../../test.module';
import { ExpenseUploadUpdateComponent } from 'app/entities/expense-upload/expense-upload-update.component';
import { ExpenseUploadService } from 'app/entities/expense-upload/expense-upload.service';
import { ExpenseUpload } from 'app/shared/model/expense-upload.model';

describe('Component Tests', () => {
    describe('ExpenseUpload Management Update Component', () => {
        let comp: ExpenseUploadUpdateComponent;
        let fixture: ComponentFixture<ExpenseUploadUpdateComponent>;
        let service: ExpenseUploadService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [ExpenseUploadUpdateComponent]
            })
                .overrideTemplate(ExpenseUploadUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ExpenseUploadUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpenseUploadService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ExpenseUpload(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.expenseUpload = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ExpenseUpload();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.expenseUpload = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
