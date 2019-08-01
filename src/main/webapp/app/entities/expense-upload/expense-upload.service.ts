import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IExpenseUpload } from 'app/shared/model/expense-upload.model';

type EntityResponseType = HttpResponse<IExpenseUpload>;
type EntityArrayResponseType = HttpResponse<IExpenseUpload[]>;

@Injectable({ providedIn: 'root' })
export class ExpenseUploadService {
    public resourceUrl = SERVER_API_URL + 'api/expense-uploads';

    constructor(protected http: HttpClient) {}

    create(expenseUpload: IExpenseUpload): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(expenseUpload);
        return this.http
            .post<IExpenseUpload>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(expenseUpload: IExpenseUpload): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(expenseUpload);
        return this.http
            .put<IExpenseUpload>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IExpenseUpload>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IExpenseUpload[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(expenseUpload: IExpenseUpload): IExpenseUpload {
        const copy: IExpenseUpload = Object.assign({}, expenseUpload, {
            statusDate: expenseUpload.statusDate != null && expenseUpload.statusDate.isValid() ? expenseUpload.statusDate.toJSON() : null,
            dateCreated:
                expenseUpload.dateCreated != null && expenseUpload.dateCreated.isValid() ? expenseUpload.dateCreated.toJSON() : null,
            accountingDate:
                expenseUpload.accountingDate != null && expenseUpload.accountingDate.isValid()
                    ? expenseUpload.accountingDate.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.statusDate = res.body.statusDate != null ? moment(res.body.statusDate) : null;
            res.body.dateCreated = res.body.dateCreated != null ? moment(res.body.dateCreated) : null;
            res.body.accountingDate = res.body.accountingDate != null ? moment(res.body.accountingDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((expenseUpload: IExpenseUpload) => {
                expenseUpload.statusDate = expenseUpload.statusDate != null ? moment(expenseUpload.statusDate) : null;
                expenseUpload.dateCreated = expenseUpload.dateCreated != null ? moment(expenseUpload.dateCreated) : null;
                expenseUpload.accountingDate = expenseUpload.accountingDate != null ? moment(expenseUpload.accountingDate) : null;
            });
        }
        return res;
    }
}
