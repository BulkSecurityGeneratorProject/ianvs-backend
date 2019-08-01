import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IExpenseStatus } from 'app/shared/model/expense-status.model';

type EntityResponseType = HttpResponse<IExpenseStatus>;
type EntityArrayResponseType = HttpResponse<IExpenseStatus[]>;

@Injectable({ providedIn: 'root' })
export class ExpenseStatusService {
    public resourceUrl = SERVER_API_URL + 'api/expense-statuses';

    constructor(protected http: HttpClient) {}

    create(expenseStatus: IExpenseStatus): Observable<EntityResponseType> {
        return this.http.post<IExpenseStatus>(this.resourceUrl, expenseStatus, { observe: 'response' });
    }

    update(expenseStatus: IExpenseStatus): Observable<EntityResponseType> {
        return this.http.put<IExpenseStatus>(this.resourceUrl, expenseStatus, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IExpenseStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IExpenseStatus[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
