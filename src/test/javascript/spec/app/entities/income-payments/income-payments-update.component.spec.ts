/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IanvsTestModule } from '../../../test.module';
import { IncomePaymentsUpdateComponent } from 'app/entities/income-payments/income-payments-update.component';
import { IncomePaymentsService } from 'app/entities/income-payments/income-payments.service';
import { IncomePayments } from 'app/shared/model/income-payments.model';

describe('Component Tests', () => {
    describe('IncomePayments Management Update Component', () => {
        let comp: IncomePaymentsUpdateComponent;
        let fixture: ComponentFixture<IncomePaymentsUpdateComponent>;
        let service: IncomePaymentsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [IncomePaymentsUpdateComponent]
            })
                .overrideTemplate(IncomePaymentsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IncomePaymentsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncomePaymentsService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new IncomePayments(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.incomePayments = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new IncomePayments();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.incomePayments = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
