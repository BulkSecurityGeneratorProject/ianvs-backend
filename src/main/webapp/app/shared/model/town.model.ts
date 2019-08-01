import { IProvince } from 'app/shared/model/province.model';
import { IBranch } from 'app/shared/model/branch.model';

export interface ITown {
    id?: number;
    town?: string;
    province?: IProvince;
    branchTowns?: IBranch[];
}

export class Town implements ITown {
    constructor(public id?: number, public town?: string, public province?: IProvince, public branchTowns?: IBranch[]) {}
}
