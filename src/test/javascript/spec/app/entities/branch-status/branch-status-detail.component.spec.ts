/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IanvsTestModule } from '../../../test.module';
import { BranchStatusDetailComponent } from 'app/entities/branch-status/branch-status-detail.component';
import { BranchStatus } from 'app/shared/model/branch-status.model';

describe('Component Tests', () => {
    describe('BranchStatus Management Detail Component', () => {
        let comp: BranchStatusDetailComponent;
        let fixture: ComponentFixture<BranchStatusDetailComponent>;
        const route = ({ data: of({ branchStatus: new BranchStatus(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [BranchStatusDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BranchStatusDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BranchStatusDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.branchStatus).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
