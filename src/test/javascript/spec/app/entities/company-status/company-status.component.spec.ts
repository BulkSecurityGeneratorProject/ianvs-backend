/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IanvsTestModule } from '../../../test.module';
import { CompanyStatusComponent } from 'app/entities/company-status/company-status.component';
import { CompanyStatusService } from 'app/entities/company-status/company-status.service';
import { CompanyStatus } from 'app/shared/model/company-status.model';

describe('Component Tests', () => {
    describe('CompanyStatus Management Component', () => {
        let comp: CompanyStatusComponent;
        let fixture: ComponentFixture<CompanyStatusComponent>;
        let service: CompanyStatusService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [CompanyStatusComponent],
                providers: []
            })
                .overrideTemplate(CompanyStatusComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompanyStatusComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyStatusService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CompanyStatus(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.companyStatuses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
