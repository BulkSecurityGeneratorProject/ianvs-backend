import { ICompany } from 'app/shared/model/company.model';

export interface ICompanyCategory {
    id?: number;
    companyCategory?: string;
    companyCategories?: ICompany[];
}

export class CompanyCategory implements ICompanyCategory {
    constructor(public id?: number, public companyCategory?: string, public companyCategories?: ICompany[]) {}
}
