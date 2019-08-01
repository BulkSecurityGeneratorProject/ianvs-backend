import { Moment } from 'moment';
import { IBranch } from 'app/shared/model/branch.model';
import { IIncomeDetails } from 'app/shared/model/income-details.model';
import { IIncomePayments } from 'app/shared/model/income-payments.model';
import { IIncomeCategory } from 'app/shared/model/income-category.model';

export interface IIncomeCapture {
    id?: number;
    salesCode?: string;
    documentDate?: Moment;
    customerName?: string;
    customerEmail?: string;
    customerMobile?: string;
    customerAddress?: string;
    dateUploaded?: Moment;
    branch?: IBranch;
    captureParents?: IIncomeDetails[];
    incomePayments?: IIncomePayments[];
    incomeCategory?: IIncomeCategory;
}

export class IncomeCapture implements IIncomeCapture {
    constructor(
        public id?: number,
        public salesCode?: string,
        public documentDate?: Moment,
        public customerName?: string,
        public customerEmail?: string,
        public customerMobile?: string,
        public customerAddress?: string,
        public dateUploaded?: Moment,
        public branch?: IBranch,
        public captureParents?: IIncomeDetails[],
        public incomePayments?: IIncomePayments[],
        public incomeCategory?: IIncomeCategory
    ) {}
}
