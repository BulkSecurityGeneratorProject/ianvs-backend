/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IanvsTestModule } from '../../../test.module';
import { ExpenseStatusDetailComponent } from 'app/entities/expense-status/expense-status-detail.component';
import { ExpenseStatus } from 'app/shared/model/expense-status.model';

describe('Component Tests', () => {
    describe('ExpenseStatus Management Detail Component', () => {
        let comp: ExpenseStatusDetailComponent;
        let fixture: ComponentFixture<ExpenseStatusDetailComponent>;
        const route = ({ data: of({ expenseStatus: new ExpenseStatus(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [ExpenseStatusDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ExpenseStatusDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ExpenseStatusDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.expenseStatus).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
