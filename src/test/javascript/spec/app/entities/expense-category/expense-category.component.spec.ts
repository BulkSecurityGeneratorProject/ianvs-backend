/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IanvsTestModule } from '../../../test.module';
import { ExpenseCategoryComponent } from 'app/entities/expense-category/expense-category.component';
import { ExpenseCategoryService } from 'app/entities/expense-category/expense-category.service';
import { ExpenseCategory } from 'app/shared/model/expense-category.model';

describe('Component Tests', () => {
    describe('ExpenseCategory Management Component', () => {
        let comp: ExpenseCategoryComponent;
        let fixture: ComponentFixture<ExpenseCategoryComponent>;
        let service: ExpenseCategoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [ExpenseCategoryComponent],
                providers: []
            })
                .overrideTemplate(ExpenseCategoryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ExpenseCategoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpenseCategoryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ExpenseCategory(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.expenseCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
