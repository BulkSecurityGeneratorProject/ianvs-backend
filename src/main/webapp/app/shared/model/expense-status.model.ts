import { IExpenseUpload } from 'app/shared/model/expense-upload.model';

export interface IExpenseStatus {
    id?: number;
    expenseStatus?: string;
    expenseStatuses?: IExpenseUpload[];
}

export class ExpenseStatus implements IExpenseStatus {
    constructor(public id?: number, public expenseStatus?: string, public expenseStatuses?: IExpenseUpload[]) {}
}
