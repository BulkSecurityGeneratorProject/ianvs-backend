/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IanvsTestModule } from '../../../test.module';
import { CompanyStatusDetailComponent } from 'app/entities/company-status/company-status-detail.component';
import { CompanyStatus } from 'app/shared/model/company-status.model';

describe('Component Tests', () => {
    describe('CompanyStatus Management Detail Component', () => {
        let comp: CompanyStatusDetailComponent;
        let fixture: ComponentFixture<CompanyStatusDetailComponent>;
        const route = ({ data: of({ companyStatus: new CompanyStatus(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [CompanyStatusDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CompanyStatusDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CompanyStatusDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.companyStatus).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
