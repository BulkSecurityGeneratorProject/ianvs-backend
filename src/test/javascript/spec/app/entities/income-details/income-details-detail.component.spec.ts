/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IanvsTestModule } from '../../../test.module';
import { IncomeDetailsDetailComponent } from 'app/entities/income-details/income-details-detail.component';
import { IncomeDetails } from 'app/shared/model/income-details.model';

describe('Component Tests', () => {
    describe('IncomeDetails Management Detail Component', () => {
        let comp: IncomeDetailsDetailComponent;
        let fixture: ComponentFixture<IncomeDetailsDetailComponent>;
        const route = ({ data: of({ incomeDetails: new IncomeDetails(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [IncomeDetailsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(IncomeDetailsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IncomeDetailsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.incomeDetails).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
