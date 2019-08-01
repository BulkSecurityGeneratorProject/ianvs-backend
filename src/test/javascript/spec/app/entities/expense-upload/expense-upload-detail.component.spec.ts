/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IanvsTestModule } from '../../../test.module';
import { ExpenseUploadDetailComponent } from 'app/entities/expense-upload/expense-upload-detail.component';
import { ExpenseUpload } from 'app/shared/model/expense-upload.model';

describe('Component Tests', () => {
    describe('ExpenseUpload Management Detail Component', () => {
        let comp: ExpenseUploadDetailComponent;
        let fixture: ComponentFixture<ExpenseUploadDetailComponent>;
        const route = ({ data: of({ expenseUpload: new ExpenseUpload(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IanvsTestModule],
                declarations: [ExpenseUploadDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ExpenseUploadDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ExpenseUploadDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.expenseUpload).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
