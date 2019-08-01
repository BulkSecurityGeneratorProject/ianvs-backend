/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IanvsTestModule } from '../../../test.module';
import { ExpenseCategoryUpdateComponent } from 'app/entities/expense-category/expense-category-update.component';
import { ExpenseCategoryService } from 'app/entities/expense-category/expense-category.service';
import { ExpenseCategory } from 'app/shared/model/expense-category.model';

describe('Component Tests', () => {
    describe('ExpenseCategory Management Update Component', () => {
        let comp: ExpenseCategoryUpdateComponent;
        let fixture: ComponentFixture<ExpenseCategoryUpdateComponent>;
        let service: ExpenseCategoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [ExpenseCategoryUpdateComponent]
            })
                .overrideTemplate(ExpenseCategoryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ExpenseCategoryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpenseCategoryService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ExpenseCategory(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.expenseCategory = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ExpenseCategory();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.expenseCategory = entity;
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
