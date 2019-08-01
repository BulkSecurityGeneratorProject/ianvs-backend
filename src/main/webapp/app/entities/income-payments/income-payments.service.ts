import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IIncomePayments } from 'app/shared/model/income-payments.model';

type EntityResponseType = HttpResponse<IIncomePayments>;
type EntityArrayResponseType = HttpResponse<IIncomePayments[]>;

@Injectable({ providedIn: 'root' })
export class IncomePaymentsService {
    public resourceUrl = SERVER_API_URL + 'api/income-payments';

    constructor(protected http: HttpClient) {}

    create(incomePayments: IIncomePayments): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(incomePayments);
        return this.http
            .post<IIncomePayments>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(incomePayments: IIncomePayments): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(incomePayments);
        return this.http
            .put<IIncomePayments>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IIncomePayments>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IIncomePayments[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(incomePayments: IIncomePayments): IIncomePayments {
        const copy: IIncomePayments = Object.assign({}, incomePayments, {
            outstandingPaymentDate:
                incomePayments.outstandingPaymentDate != null && incomePayments.outstandingPaymentDate.isValid()
                    ? incomePayments.outstandingPaymentDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.outstandingPaymentDate = res.body.outstandingPaymentDate != null ? moment(res.body.outstandingPaymentDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((incomePayments: IIncomePayments) => {
                incomePayments.outstandingPaymentDate =
                    incomePayments.outstandingPaymentDate != null ? moment(incomePayments.outstandingPaymentDate) : null;
            });
        }
        return res;
    }
}
