import { Moment } from 'moment';
import { IBranch } from 'app/shared/model/branch.model';
import { IExpenseStatus } from 'app/shared/model/expense-status.model';
import { IExpenseCategory } from 'app/shared/model/expense-category.model';

export interface IExpenseUpload {
    id?: number;
    fileName?: string;
    statusDate?: Moment;
    photoContentType?: string;
    photo?: any;
    dateCreated?: Moment;
    accountingDate?: Moment;
    branch?: IBranch;
    expenseStatus?: IExpenseStatus;
    expenseCategory?: IExpenseCategory;
}

export class ExpenseUpload implements IExpenseUpload {
    constructor(
        public id?: number,
        public fileName?: string,
        public statusDate?: Moment,
        public photoContentType?: string,
        public photo?: any,
        public dateCreated?: Moment,
        public accountingDate?: Moment,
        public branch?: IBranch,
        public expenseStatus?: IExpenseStatus,
        public expenseCategory?: IExpenseCategory
    ) {}
}
