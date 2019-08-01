import { Moment } from 'moment';
import { IBranch } from 'app/shared/model/branch.model';
import { ICompanyCategory } from 'app/shared/model/company-category.model';
import { ICompanyStatus } from 'app/shared/model/company-status.model';

export interface ICompany {
    id?: number;
    company?: string;
    companyCode?: string;
    pin?: string;
    registrationDate?: Moment;
    branchCompanies?: IBranch[];
    companyCategory?: ICompanyCategory;
    companyStatus?: ICompanyStatus;
}

export class Company implements ICompany {
    constructor(
        public id?: number,
        public company?: string,
        public companyCode?: string,
        public pin?: string,
        public registrationDate?: Moment,
        public branchCompanies?: IBranch[],
        public companyCategory?: ICompanyCategory,
        public companyStatus?: ICompanyStatus
    ) {}
}
