/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IanvsTestModule } from '../../../test.module';
import { CompanyStatusUpdateComponent } from 'app/entities/company-status/company-status-update.component';
import { CompanyStatusService } from 'app/entities/company-status/company-status.service';
import { CompanyStatus } from 'app/shared/model/company-status.model';

describe('Component Tests', () => {
    describe('CompanyStatus Management Update Component', () => {
        let comp: CompanyStatusUpdateComponent;
        let fixture: ComponentFixture<CompanyStatusUpdateComponent>;
        let service: CompanyStatusService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [CompanyStatusUpdateComponent]
            })
                .overrideTemplate(CompanyStatusUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompanyStatusUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyStatusService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new CompanyStatus(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.companyStatus = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new CompanyStatus();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.companyStatus = entity;
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
