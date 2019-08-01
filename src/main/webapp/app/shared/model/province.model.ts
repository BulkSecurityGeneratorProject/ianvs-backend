import { ICountry } from 'app/shared/model/country.model';
import { ITown } from 'app/shared/model/town.model';

export interface IProvince {
    id?: number;
    province?: string;
    country?: ICountry;
    provinceTowns?: ITown[];
}

export class Province implements IProvince {
    constructor(public id?: number, public province?: string, public country?: ICountry, public provinceTowns?: ITown[]) {}
}
