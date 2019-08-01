import { IExpenseUpload } from 'app/shared/model/expense-upload.model';

export interface IExpenseCategory {
    id?: number;
    expenseCategory?: string;
    fileTypes?: IExpenseUpload[];
}

export class ExpenseCategory implements IExpenseCategory {
    constructor(public id?: number, public expenseCategory?: string, public fileTypes?: IExpenseUpload[]) {}
}
