import { IProvince } from 'app/shared/model/province.model';

export interface ICountry {
    id?: number;
    country?: string;
    code?: string;
    countryCounties?: IProvince[];
}

export class Country implements ICountry {
    constructor(public id?: number, public country?: string, public code?: string, public countryCounties?: IProvince[]) {}
}
