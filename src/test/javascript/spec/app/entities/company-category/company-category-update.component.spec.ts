/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IanvsTestModule } from '../../../test.module';
import { CompanyCategoryUpdateComponent } from 'app/entities/company-category/company-category-update.component';
import { CompanyCategoryService } from 'app/entities/company-category/company-category.service';
import { CompanyCategory } from 'app/shared/model/company-category.model';

describe('Component Tests', () => {
    describe('CompanyCategory Management Update Component', () => {
        let comp: CompanyCategoryUpdateComponent;
        let fixture: ComponentFixture<CompanyCategoryUpdateComponent>;
        let service: CompanyCategoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [CompanyCategoryUpdateComponent]
            })
                .overrideTemplate(CompanyCategoryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompanyCategoryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyCategoryService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new CompanyCategory(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.companyCategory = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new CompanyCategory();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.companyCategory = entity;
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
