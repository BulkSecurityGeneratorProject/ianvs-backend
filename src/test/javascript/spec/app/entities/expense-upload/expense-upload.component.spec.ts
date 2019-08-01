/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IanvsTestModule } from '../../../test.module';
import { ExpenseUploadComponent } from 'app/entities/expense-upload/expense-upload.component';
import { ExpenseUploadService } from 'app/entities/expense-upload/expense-upload.service';
import { ExpenseUpload } from 'app/shared/model/expense-upload.model';

describe('Component Tests', () => {
    describe('ExpenseUpload Management Component', () => {
        let comp: ExpenseUploadComponent;
        let fixture: ComponentFixture<ExpenseUploadComponent>;
        let service: ExpenseUploadService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [ExpenseUploadComponent],
                providers: []
            })
                .overrideTemplate(ExpenseUploadComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ExpenseUploadComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpenseUploadService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ExpenseUpload(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.expenseUploads[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
