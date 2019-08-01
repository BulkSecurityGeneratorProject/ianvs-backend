import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICompanyStatus } from 'app/shared/model/company-status.model';

type EntityResponseType = HttpResponse<ICompanyStatus>;
type EntityArrayResponseType = HttpResponse<ICompanyStatus[]>;

@Injectable({ providedIn: 'root' })
export class CompanyStatusService {
    public resourceUrl = SERVER_API_URL + 'api/company-statuses';

    constructor(protected http: HttpClient) {}

    create(companyStatus: ICompanyStatus): Observable<EntityResponseType> {
        return this.http.post<ICompanyStatus>(this.resourceUrl, companyStatus, { observe: 'response' });
    }

    update(companyStatus: ICompanyStatus): Observable<EntityResponseType> {
        return this.http.put<ICompanyStatus>(this.resourceUrl, companyStatus, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICompanyStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICompanyStatus[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
