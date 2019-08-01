/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ExpenseUploadService } from 'app/entities/expense-upload/expense-upload.service';
import { IExpenseUpload, ExpenseUpload } from 'app/shared/model/expense-upload.model';

describe('Service Tests', () => {
    describe('ExpenseUpload Service', () => {
        let injector: TestBed;
        let service: ExpenseUploadService;
        let httpMock: HttpTestingController;
        let elemDefault: IExpenseUpload;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ExpenseUploadService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new ExpenseUpload(0, 'AAAAAAA', currentDate, 'image/png', 'AAAAAAA', currentDate, currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        statusDate: currentDate.format(DATE_TIME_FORMAT),
                        dateCreated: currentDate.format(DATE_TIME_FORMAT),
                        accountingDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a ExpenseUpload', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        statusDate: currentDate.format(DATE_TIME_FORMAT),
                        dateCreated: currentDate.format(DATE_TIME_FORMAT),
                        accountingDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        statusDate: currentDate,
                        dateCreated: currentDate,
                        accountingDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new ExpenseUpload(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a ExpenseUpload', async () => {
                const returnedFromService = Object.assign(
                    {
                        fileName: 'BBBBBB',
                        statusDate: currentDate.format(DATE_TIME_FORMAT),
                        photo: 'BBBBBB',
                        dateCreated: currentDate.format(DATE_TIME_FORMAT),
                        accountingDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        statusDate: currentDate,
                        dateCreated: currentDate,
                        accountingDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of ExpenseUpload', async () => {
                const returnedFromService = Object.assign(
                    {
                        fileName: 'BBBBBB',
                        statusDate: currentDate.format(DATE_TIME_FORMAT),
                        photo: 'BBBBBB',
                        dateCreated: currentDate.format(DATE_TIME_FORMAT),
                        accountingDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        statusDate: currentDate,
                        dateCreated: currentDate,
                        accountingDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a ExpenseUpload', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
