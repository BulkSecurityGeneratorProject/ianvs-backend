import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IExpenseCategory } from 'app/shared/model/expense-category.model';

type EntityResponseType = HttpResponse<IExpenseCategory>;
type EntityArrayResponseType = HttpResponse<IExpenseCategory[]>;

@Injectable({ providedIn: 'root' })
export class ExpenseCategoryService {
    public resourceUrl = SERVER_API_URL + 'api/expense-categories';

    constructor(protected http: HttpClient) {}

    create(expenseCategory: IExpenseCategory): Observable<EntityResponseType> {
        return this.http.post<IExpenseCategory>(this.resourceUrl, expenseCategory, { observe: 'response' });
    }

    update(expenseCategory: IExpenseCategory): Observable<EntityResponseType> {
        return this.http.put<IExpenseCategory>(this.resourceUrl, expenseCategory, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IExpenseCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IExpenseCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
