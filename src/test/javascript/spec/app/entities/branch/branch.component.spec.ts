/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IanvsTestModule } from '../../../test.module';
import { BranchComponent } from 'app/entities/branch/branch.component';
import { BranchService } from 'app/entities/branch/branch.service';
import { Branch } from 'app/shared/model/branch.model';

describe('Component Tests', () => {
    describe('Branch Management Component', () => {
        let comp: BranchComponent;
        let fixture: ComponentFixture<BranchComponent>;
        let service: BranchService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [BranchComponent],
                providers: []
            })
                .overrideTemplate(BranchComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BranchComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BranchService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Branch(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.branches[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
