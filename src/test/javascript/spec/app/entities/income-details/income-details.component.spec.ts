/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IanvsTestModule } from '../../../test.module';
import { IncomeDetailsComponent } from 'app/entities/income-details/income-details.component';
import { IncomeDetailsService } from 'app/entities/income-details/income-details.service';
import { IncomeDetails } from 'app/shared/model/income-details.model';

describe('Component Tests', () => {
    describe('IncomeDetails Management Component', () => {
        let comp: IncomeDetailsComponent;
        let fixture: ComponentFixture<IncomeDetailsComponent>;
        let service: IncomeDetailsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [IncomeDetailsComponent],
                providers: []
            })
                .overrideTemplate(IncomeDetailsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IncomeDetailsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncomeDetailsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new IncomeDetails(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.incomeDetails[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
