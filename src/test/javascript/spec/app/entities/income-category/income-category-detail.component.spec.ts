/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IanvsTestModule } from '../../../test.module';
import { IncomeCategoryDetailComponent } from 'app/entities/income-category/income-category-detail.component';
import { IncomeCategory } from 'app/shared/model/income-category.model';

describe('Component Tests', () => {
    describe('IncomeCategory Management Detail Component', () => {
        let comp: IncomeCategoryDetailComponent;
        let fixture: ComponentFixture<IncomeCategoryDetailComponent>;
        const route = ({ data: of({ incomeCategory: new IncomeCategory(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [IncomeCategoryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(IncomeCategoryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IncomeCategoryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.incomeCategory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
