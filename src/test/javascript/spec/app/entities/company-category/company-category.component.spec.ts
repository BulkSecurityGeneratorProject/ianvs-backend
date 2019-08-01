/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IanvsTestModule } from '../../../test.module';
import { CompanyCategoryComponent } from 'app/entities/company-category/company-category.component';
import { CompanyCategoryService } from 'app/entities/company-category/company-category.service';
import { CompanyCategory } from 'app/shared/model/company-category.model';

describe('Component Tests', () => {
    describe('CompanyCategory Management Component', () => {
        let comp: CompanyCategoryComponent;
        let fixture: ComponentFixture<CompanyCategoryComponent>;
        let service: CompanyCategoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [CompanyCategoryComponent],
                providers: []
            })
                .overrideTemplate(CompanyCategoryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompanyCategoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyCategoryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CompanyCategory(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.companyCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
