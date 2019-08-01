import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBranch } from 'app/shared/model/branch.model';

type EntityResponseType = HttpResponse<IBranch>;
type EntityArrayResponseType = HttpResponse<IBranch[]>;

@Injectable({ providedIn: 'root' })
export class BranchService {
    public resourceUrl = SERVER_API_URL + 'api/branches';

    constructor(protected http: HttpClient) {}

    create(branch: IBranch): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(branch);
        return this.http
            .post<IBranch>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(branch: IBranch): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(branch);
        return this.http
            .put<IBranch>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IBranch>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBranch[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(branch: IBranch): IBranch {
        const copy: IBranch = Object.assign({}, branch, {
            registrationDate: branch.registrationDate != null && branch.registrationDate.isValid() ? branch.registrationDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.registrationDate = res.body.registrationDate != null ? moment(res.body.registrationDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((branch: IBranch) => {
                branch.registrationDate = branch.registrationDate != null ? moment(branch.registrationDate) : null;
            });
        }
        return res;
    }
}
