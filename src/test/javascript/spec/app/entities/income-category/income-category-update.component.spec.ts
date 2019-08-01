/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IanvsTestModule } from '../../../test.module';
import { IncomeCategoryUpdateComponent } from 'app/entities/income-category/income-category-update.component';
import { IncomeCategoryService } from 'app/entities/income-category/income-category.service';
import { IncomeCategory } from 'app/shared/model/income-category.model';

describe('Component Tests', () => {
    describe('IncomeCategory Management Update Component', () => {
        let comp: IncomeCategoryUpdateComponent;
        let fixture: ComponentFixture<IncomeCategoryUpdateComponent>;
        let service: IncomeCategoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [IncomeCategoryUpdateComponent]
            })
                .overrideTemplate(IncomeCategoryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IncomeCategoryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncomeCategoryService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new IncomeCategory(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.incomeCategory = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new IncomeCategory();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.incomeCategory = entity;
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
