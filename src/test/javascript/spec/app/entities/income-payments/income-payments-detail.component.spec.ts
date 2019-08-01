/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IanvsTestModule } from '../../../test.module';
import { IncomePaymentsDetailComponent } from 'app/entities/income-payments/income-payments-detail.component';
import { IncomePayments } from 'app/shared/model/income-payments.model';

describe('Component Tests', () => {
    describe('IncomePayments Management Detail Component', () => {
        let comp: IncomePaymentsDetailComponent;
        let fixture: ComponentFixture<IncomePaymentsDetailComponent>;
        const route = ({ data: of({ incomePayments: new IncomePayments(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [IncomePaymentsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(IncomePaymentsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IncomePaymentsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.incomePayments).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
