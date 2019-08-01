import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBranchStatus } from 'app/shared/model/branch-status.model';

type EntityResponseType = HttpResponse<IBranchStatus>;
type EntityArrayResponseType = HttpResponse<IBranchStatus[]>;

@Injectable({ providedIn: 'root' })
export class BranchStatusService {
    public resourceUrl = SERVER_API_URL + 'api/branch-statuses';

    constructor(protected http: HttpClient) {}

    create(branchStatus: IBranchStatus): Observable<EntityResponseType> {
        return this.http.post<IBranchStatus>(this.resourceUrl, branchStatus, { observe: 'response' });
    }

    update(branchStatus: IBranchStatus): Observable<EntityResponseType> {
        return this.http.put<IBranchStatus>(this.resourceUrl, branchStatus, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IBranchStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IBranchStatus[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
