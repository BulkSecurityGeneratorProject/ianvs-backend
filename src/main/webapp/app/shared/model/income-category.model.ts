import { IIncomeCapture } from 'app/shared/model/income-capture.model';

export interface IIncomeCategory {
    id?: number;
    categoryName?: string;
    captureCategories?: IIncomeCapture[];
}

export class IncomeCategory implements IIncomeCategory {
    constructor(public id?: number, public categoryName?: string, public captureCategories?: IIncomeCapture[]) {}
}
