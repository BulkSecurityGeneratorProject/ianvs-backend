import { Moment } from 'moment';
import { ITown } from 'app/shared/model/town.model';
import { ICompany } from 'app/shared/model/company.model';
import { IExpenseUpload } from 'app/shared/model/expense-upload.model';
import { IIncomeCapture } from 'app/shared/model/income-capture.model';
import { IBranchStatus } from 'app/shared/model/branch-status.model';

export interface IBranch {
    id?: number;
    branchName?: string;
    address?: string;
    street?: string;
    email?: string;
    mobile?: string;
    registrationDate?: Moment;
    town?: ITown;
    company?: ICompany;
    uploadBranches?: IExpenseUpload[];
    captureBranches?: IIncomeCapture[];
    branchStatus?: IBranchStatus;
}

export class Branch implements IBranch {
    constructor(
        public id?: number,
        public branchName?: string,
        public address?: string,
        public street?: string,
        public email?: string,
        public mobile?: string,
        public registrationDate?: Moment,
        public town?: ITown,
        public company?: ICompany,
        public uploadBranches?: IExpenseUpload[],
        public captureBranches?: IIncomeCapture[],
        public branchStatus?: IBranchStatus
    ) {}
}
