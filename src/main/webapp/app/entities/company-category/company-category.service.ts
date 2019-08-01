import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICompanyCategory } from 'app/shared/model/company-category.model';

type EntityResponseType = HttpResponse<ICompanyCategory>;
type EntityArrayResponseType = HttpResponse<ICompanyCategory[]>;

@Injectable({ providedIn: 'root' })
export class CompanyCategoryService {
    public resourceUrl = SERVER_API_URL + 'api/company-categories';

    constructor(protected http: HttpClient) {}

    create(companyCategory: ICompanyCategory): Observable<EntityResponseType> {
        return this.http.post<ICompanyCategory>(this.resourceUrl, companyCategory, { observe: 'response' });
    }

    update(companyCategory: ICompanyCategory): Observable<EntityResponseType> {
        return this.http.put<ICompanyCategory>(this.resourceUrl, companyCategory, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICompanyCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICompanyCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
