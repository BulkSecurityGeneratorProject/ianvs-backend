/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IanvsTestModule } from '../../../test.module';
import { IncomePaymentsComponent } from 'app/entities/income-payments/income-payments.component';
import { IncomePaymentsService } from 'app/entities/income-payments/income-payments.service';
import { IncomePayments } from 'app/shared/model/income-payments.model';

describe('Component Tests', () => {
    describe('IncomePayments Management Component', () => {
        let comp: IncomePaymentsComponent;
        let fixture: ComponentFixture<IncomePaymentsComponent>;
        let service: IncomePaymentsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [IncomePaymentsComponent],
                providers: []
            })
                .overrideTemplate(IncomePaymentsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IncomePaymentsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncomePaymentsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new IncomePayments(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.incomePayments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
