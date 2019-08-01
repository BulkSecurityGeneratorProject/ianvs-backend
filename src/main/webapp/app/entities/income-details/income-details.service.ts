import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IIncomeDetails } from 'app/shared/model/income-details.model';

type EntityResponseType = HttpResponse<IIncomeDetails>;
type EntityArrayResponseType = HttpResponse<IIncomeDetails[]>;

@Injectable({ providedIn: 'root' })
export class IncomeDetailsService {
    public resourceUrl = SERVER_API_URL + 'api/income-details';

    constructor(protected http: HttpClient) {}

    create(incomeDetails: IIncomeDetails): Observable<EntityResponseType> {
        return this.http.post<IIncomeDetails>(this.resourceUrl, incomeDetails, { observe: 'response' });
    }

    update(incomeDetails: IIncomeDetails): Observable<EntityResponseType> {
        return this.http.put<IIncomeDetails>(this.resourceUrl, incomeDetails, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IIncomeDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IIncomeDetails[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
