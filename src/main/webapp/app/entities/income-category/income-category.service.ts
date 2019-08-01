import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IIncomeCategory } from 'app/shared/model/income-category.model';

type EntityResponseType = HttpResponse<IIncomeCategory>;
type EntityArrayResponseType = HttpResponse<IIncomeCategory[]>;

@Injectable({ providedIn: 'root' })
export class IncomeCategoryService {
    public resourceUrl = SERVER_API_URL + 'api/income-categories';

    constructor(protected http: HttpClient) {}

    create(incomeCategory: IIncomeCategory): Observable<EntityResponseType> {
        return this.http.post<IIncomeCategory>(this.resourceUrl, incomeCategory, { observe: 'response' });
    }

    update(incomeCategory: IIncomeCategory): Observable<EntityResponseType> {
        return this.http.put<IIncomeCategory>(this.resourceUrl, incomeCategory, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IIncomeCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IIncomeCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
