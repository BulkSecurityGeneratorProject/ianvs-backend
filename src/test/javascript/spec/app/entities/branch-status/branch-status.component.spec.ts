/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IanvsTestModule } from '../../../test.module';
import { BranchStatusComponent } from 'app/entities/branch-status/branch-status.component';
import { BranchStatusService } from 'app/entities/branch-status/branch-status.service';
import { BranchStatus } from 'app/shared/model/branch-status.model';

describe('Component Tests', () => {
    describe('BranchStatus Management Component', () => {
        let comp: BranchStatusComponent;
        let fixture: ComponentFixture<BranchStatusComponent>;
        let service: BranchStatusService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [BranchStatusComponent],
                providers: []
            })
                .overrideTemplate(BranchStatusComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BranchStatusComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BranchStatusService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new BranchStatus(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.branchStatuses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
