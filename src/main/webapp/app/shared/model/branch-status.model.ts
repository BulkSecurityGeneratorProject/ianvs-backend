import { IBranch } from 'app/shared/model/branch.model';

export interface IBranchStatus {
    id?: number;
    branchStatus?: string;
    branchStatuses?: IBranch[];
}

export class BranchStatus implements IBranchStatus {
    constructor(public id?: number, public branchStatus?: string, public branchStatuses?: IBranch[]) {}
}
