/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IanvsTestModule } from '../../../test.module';
import { CompanyCategoryDetailComponent } from 'app/entities/company-category/company-category-detail.component';
import { CompanyCategory } from 'app/shared/model/company-category.model';

describe('Component Tests', () => {
    describe('CompanyCategory Management Detail Component', () => {
        let comp: CompanyCategoryDetailComponent;
        let fixture: ComponentFixture<CompanyCategoryDetailComponent>;
        const route = ({ data: of({ companyCategory: new CompanyCategory(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [CompanyCategoryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CompanyCategoryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CompanyCategoryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.companyCategory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
