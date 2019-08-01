/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IanvsTestModule } from '../../../test.module';
import { IncomeCaptureComponent } from 'app/entities/income-capture/income-capture.component';
import { IncomeCaptureService } from 'app/entities/income-capture/income-capture.service';
import { IncomeCapture } from 'app/shared/model/income-capture.model';

describe('Component Tests', () => {
    describe('IncomeCapture Management Component', () => {
        let comp: IncomeCaptureComponent;
        let fixture: ComponentFixture<IncomeCaptureComponent>;
        let service: IncomeCaptureService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [IncomeCaptureComponent],
                providers: []
            })
                .overrideTemplate(IncomeCaptureComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IncomeCaptureComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncomeCaptureService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new IncomeCapture(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.incomeCaptures[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
