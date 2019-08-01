import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITown } from 'app/shared/model/town.model';
import { TownService } from './town.service';
import { IProvince } from 'app/shared/model/province.model';
import { ProvinceService } from 'app/entities/province';

@Component({
    selector: 'jhi-town-update',
    templateUrl: './town-update.component.html'
})
export class TownUpdateComponent implements OnInit {
    town: ITown;
    isSaving: boolean;

    provinces: IProvince[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected townService: TownService,
        protected provinceService: ProvinceService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ town }) => {
            this.town = town;
        });
        this.provinceService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProvince[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProvince[]>) => response.body)
            )
            .subscribe((res: IProvince[]) => (this.provinces = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.town.id !== undefined) {
            this.subscribeToSaveResponse(this.townService.update(this.town));
        } else {
            this.subscribeToSaveResponse(this.townService.create(this.town));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITown>>) {
        result.subscribe((res: HttpResponse<ITown>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackProvinceById(index: number, item: IProvince) {
        return item.id;
    }
}
