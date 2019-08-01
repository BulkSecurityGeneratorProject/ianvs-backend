import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IIncomeCapture } from 'app/shared/model/income-capture.model';

type EntityResponseType = HttpResponse<IIncomeCapture>;
type EntityArrayResponseType = HttpResponse<IIncomeCapture[]>;

@Injectable({ providedIn: 'root' })
export class IncomeCaptureService {
    public resourceUrl = SERVER_API_URL + 'api/income-captures';

    constructor(protected http: HttpClient) {}

    create(incomeCapture: IIncomeCapture): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(incomeCapture);
        return this.http
            .post<IIncomeCapture>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(incomeCapture: IIncomeCapture): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(incomeCapture);
        return this.http
            .put<IIncomeCapture>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IIncomeCapture>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IIncomeCapture[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(incomeCapture: IIncomeCapture): IIncomeCapture {
        const copy: IIncomeCapture = Object.assign({}, incomeCapture, {
            documentDate:
                incomeCapture.documentDate != null && incomeCapture.documentDate.isValid() ? incomeCapture.documentDate.toJSON() : null,
            dateUploaded:
                incomeCapture.dateUploaded != null && incomeCapture.dateUploaded.isValid() ? incomeCapture.dateUploaded.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.documentDate = res.body.documentDate != null ? moment(res.body.documentDate) : null;
            res.body.dateUploaded = res.body.dateUploaded != null ? moment(res.body.dateUploaded) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((incomeCapture: IIncomeCapture) => {
                incomeCapture.documentDate = incomeCapture.documentDate != null ? moment(incomeCapture.documentDate) : null;
                incomeCapture.dateUploaded = incomeCapture.dateUploaded != null ? moment(incomeCapture.dateUploaded) : null;
            });
        }
        return res;
    }
}
