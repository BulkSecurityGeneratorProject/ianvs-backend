/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IanvsTestModule } from '../../../test.module';
import { ExpenseCategoryDetailComponent } from 'app/entities/expense-category/expense-category-detail.component';
import { ExpenseCategory } from 'app/shared/model/expense-category.model';

describe('Component Tests', () => {
    describe('ExpenseCategory Management Detail Component', () => {
        let comp: ExpenseCategoryDetailComponent;
        let fixture: ComponentFixture<ExpenseCategoryDetailComponent>;
        const route = ({ data: of({ expenseCategory: new ExpenseCategory(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [ExpenseCategoryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ExpenseCategoryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ExpenseCategoryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.expenseCategory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
