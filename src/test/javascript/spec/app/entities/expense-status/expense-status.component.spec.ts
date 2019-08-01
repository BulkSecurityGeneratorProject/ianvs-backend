/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IanvsTestModule } from '../../../test.module';
import { ExpenseStatusComponent } from 'app/entities/expense-status/expense-status.component';
import { ExpenseStatusService } from 'app/entities/expense-status/expense-status.service';
import { ExpenseStatus } from 'app/shared/model/expense-status.model';

describe('Component Tests', () => {
    describe('ExpenseStatus Management Component', () => {
        let comp: ExpenseStatusComponent;
        let fixture: ComponentFixture<ExpenseStatusComponent>;
        let service: ExpenseStatusService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [ExpenseStatusComponent],
                providers: []
            })
                .overrideTemplate(ExpenseStatusComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ExpenseStatusComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpenseStatusService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ExpenseStatus(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.expenseStatuses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
