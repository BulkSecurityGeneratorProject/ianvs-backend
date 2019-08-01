/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IncomeCaptureService } from 'app/entities/income-capture/income-capture.service';
import { IIncomeCapture, IncomeCapture } from 'app/shared/model/income-capture.model';

describe('Service Tests', () => {
    describe('IncomeCapture Service', () => {
        let injector: TestBed;
        let service: IncomeCaptureService;
        let httpMock: HttpTestingController;
        let elemDefault: IIncomeCapture;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(IncomeCaptureService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new IncomeCapture(0, 'AAAAAAA', currentDate, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        documentDate: currentDate.format(DATE_TIME_FORMAT),
                        dateUploaded: currentDate.format(DATE_TIME_FORMAT)
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

            it('should create a IncomeCapture', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        documentDate: currentDate.format(DATE_TIME_FORMAT),
                        dateUploaded: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        documentDate: currentDate,
                        dateUploaded: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new IncomeCapture(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a IncomeCapture', async () => {
                const returnedFromService = Object.assign(
                    {
                        salesCode: 'BBBBBB',
                        documentDate: currentDate.format(DATE_TIME_FORMAT),
                        customerName: 'BBBBBB',
                        customerEmail: 'BBBBBB',
                        customerMobile: 'BBBBBB',
                        customerAddress: 'BBBBBB',
                        dateUploaded: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        documentDate: currentDate,
                        dateUploaded: currentDate
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

            it('should return a list of IncomeCapture', async () => {
                const returnedFromService = Object.assign(
                    {
                        salesCode: 'BBBBBB',
                        documentDate: currentDate.format(DATE_TIME_FORMAT),
                        customerName: 'BBBBBB',
                        customerEmail: 'BBBBBB',
                        customerMobile: 'BBBBBB',
                        customerAddress: 'BBBBBB',
                        dateUploaded: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        documentDate: currentDate,
                        dateUploaded: currentDate
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

            it('should delete a IncomeCapture', async () => {
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
