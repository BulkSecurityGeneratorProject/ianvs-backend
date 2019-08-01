/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IanvsTestModule } from '../../../test.module';
import { IncomeCaptureDetailComponent } from 'app/entities/income-capture/income-capture-detail.component';
import { IncomeCapture } from 'app/shared/model/income-capture.model';

describe('Component Tests', () => {
    describe('IncomeCapture Management Detail Component', () => {
        let comp: IncomeCaptureDetailComponent;
        let fixture: ComponentFixture<IncomeCaptureDetailComponent>;
        const route = ({ data: of({ incomeCapture: new IncomeCapture(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [IncomeCaptureDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(IncomeCaptureDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IncomeCaptureDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.incomeCapture).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
