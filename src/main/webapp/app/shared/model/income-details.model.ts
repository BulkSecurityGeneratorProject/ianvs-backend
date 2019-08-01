import { IIncomeCapture } from 'app/shared/model/income-capture.model';

export interface IIncomeDetails {
    id?: number;
    itemDescription?: string;
    unitPrice?: number;
    quantity?: number;
    totalVat?: number;
    totalPrice?: number;
    incomeCapture?: IIncomeCapture;
}

export class IncomeDetails implements IIncomeDetails {
    constructor(
        public id?: number,
        public itemDescription?: string,
        public unitPrice?: number,
        public quantity?: number,
        public totalVat?: number,
        public totalPrice?: number,
        public incomeCapture?: IIncomeCapture
    ) {}
}
