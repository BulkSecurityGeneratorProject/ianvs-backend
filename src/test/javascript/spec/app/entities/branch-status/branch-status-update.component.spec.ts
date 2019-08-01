/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IanvsTestModule } from '../../../test.module';
import { BranchStatusUpdateComponent } from 'app/entities/branch-status/branch-status-update.component';
import { BranchStatusService } from 'app/entities/branch-status/branch-status.service';
import { BranchStatus } from 'app/shared/model/branch-status.model';

describe('Component Tests', () => {
    describe('BranchStatus Management Update Component', () => {
        let comp: BranchStatusUpdateComponent;
        let fixture: ComponentFixture<BranchStatusUpdateComponent>;
        let service: BranchStatusService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [BranchStatusUpdateComponent]
            })
                .overrideTemplate(BranchStatusUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BranchStatusUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BranchStatusService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new BranchStatus(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.branchStatus = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new BranchStatus();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.branchStatus = entity;
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
