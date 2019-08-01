/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IanvsTestModule } from '../../../test.module';
import { IncomeCategoryComponent } from 'app/entities/income-category/income-category.component';
import { IncomeCategoryService } from 'app/entities/income-category/income-category.service';
import { IncomeCategory } from 'app/shared/model/income-category.model';

describe('Component Tests', () => {
    describe('IncomeCategory Management Component', () => {
        let comp: IncomeCategoryComponent;
        let fixture: ComponentFixture<IncomeCategoryComponent>;
        let service: IncomeCategoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [IncomeCategoryComponent],
                providers: []
            })
                .overrideTemplate(IncomeCategoryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IncomeCategoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncomeCategoryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new IncomeCategory(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.incomeCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
