import { ICompany } from 'app/shared/model/company.model';

export interface ICompanyStatus {
    id?: number;
    companyStatus?: string;
    companyStatuses?: ICompany[];
}

export class CompanyStatus implements ICompanyStatus {
    constructor(public id?: number, public companyStatus?: string, public companyStatuses?: ICompany[]) {}
}
