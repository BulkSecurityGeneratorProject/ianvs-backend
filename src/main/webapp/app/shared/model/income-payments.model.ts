import { Moment } from 'moment';
import { IIncomeCapture } from 'app/shared/model/income-capture.model';

export interface IIncomePayments {
    id?: number;
    amountPaid?: number;
    amountOutstanding?: number;
    outstandingPaymentDate?: Moment;
    incomeCapture?: IIncomeCapture;
}

export class IncomePayments implements IIncomePayments {
    constructor(
        public id?: number,
        public amountPaid?: number,
        public amountOutstanding?: number,
        public outstandingPaymentDate?: Moment,
        public incomeCapture?: IIncomeCapture
    ) {}
}
