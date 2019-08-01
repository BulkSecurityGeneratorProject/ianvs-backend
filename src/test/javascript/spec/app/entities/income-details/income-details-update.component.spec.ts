/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IanvsTestModule } from '../../../test.module';
import { IncomeDetailsUpdateComponent } from 'app/entities/income-details/income-details-update.component';
import { IncomeDetailsService } from 'app/entities/income-details/income-details.service';
import { IncomeDetails } from 'app/shared/model/income-details.model';

describe('Component Tests', () => {
    describe('IncomeDetails Management Update Component', () => {
        let comp: IncomeDetailsUpdateComponent;
        let fixture: ComponentFixture<IncomeDetailsUpdateComponent>;
        let service: IncomeDetailsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [IncomeDetailsUpdateComponent]
            })
                .overrideTemplate(IncomeDetailsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IncomeDetailsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncomeDetailsService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new IncomeDetails(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.incomeDetails = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new IncomeDetails();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.incomeDetails = entity;
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
