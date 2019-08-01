/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IanvsTestModule } from '../../../test.module';
import { IncomeCaptureUpdateComponent } from 'app/entities/income-capture/income-capture-update.component';
import { IncomeCaptureService } from 'app/entities/income-capture/income-capture.service';
import { IncomeCapture } from 'app/shared/model/income-capture.model';

describe('Component Tests', () => {
    describe('IncomeCapture Management Update Component', () => {
        let comp: IncomeCaptureUpdateComponent;
        let fixture: ComponentFixture<IncomeCaptureUpdateComponent>;
        let service: IncomeCaptureService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [IncomeCaptureUpdateComponent]
            })
                .overrideTemplate(IncomeCaptureUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IncomeCaptureUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncomeCaptureService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new IncomeCapture(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.incomeCapture = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new IncomeCapture();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.incomeCapture = entity;
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
