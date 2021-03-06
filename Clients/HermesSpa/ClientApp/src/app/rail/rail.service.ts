import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RailStation, TrainsListRequest, TrainsListResult, CarsListResult,
    SeatsListResult, SeatOptionParams, Traveller } from './rail.models';

import { IAutoCompleteListSource } from '../shared/autocomplete.component';

export class RailStationsListSource implements IAutoCompleteListSource {
    constructor(private _http: HttpClient, private baseUrl: string) { }
    public search = (term: string): Observable<{ name: string }[]> =>
        this._http.get<RailStation[]>(`${this.baseUrl}api/rail/stations?term=${term}`)
}

@Injectable()
export class RailService {
    private _url: string;
    private _search: TrainsListRequest;
    private _stationsSource: RailStationsListSource;

    constructor(
        private _http: HttpClient,
        @Inject('BASE_URL') baseUrl: string,
        private router: Router
    ) {
        this._url = baseUrl + 'api/rail';
        this._stationsSource = new RailStationsListSource(_http, baseUrl);
    }

    public setSearch = (params: TrainsListRequest): void => {
        this._search = params;
    }

    public getSearch = (): TrainsListRequest =>
        this._search ? this._search : new TrainsListRequest('', '', '')

    public getRailStationsSource = (): RailStationsListSource => this._stationsSource;

    public queryTrains = (request: TrainsListRequest): Observable<TrainsListResult> =>
        this._http.get<TrainsListResult>(`${this._url}/trains`, {
            params: {
                'from': request.fromCity,
                'to': request.toCity,
                'departDate': request.departDate,
                //'fromHour': request.hourFrom.toString()
                //'toHour': request.hourTo.toString()
            }
        })

    public queryCars = (sessionId: string, optionRef: number): Observable<CarsListResult> =>
        this._http.get<CarsListResult>(`${this._url}/trains/cars`, {
            params: {
                'sessionId': sessionId,
                'optionRef': optionRef.toString()
            }
        })

    public querySeats = (sessionId: string, trainRef: number, optionRef: number): Observable<SeatsListResult> =>
        this._http.get<SeatsListResult>(`${this._url}/trains/seats`, {
            params: {
                'sessionId': sessionId,
                'trainRef': trainRef.toString(),
                'optionRef': optionRef.toString()
            }
        })

    public reserveCreate = (option: SeatOptionParams, passengers: Traveller[]): Observable<any> =>
        this._http.post(`${this._url}/reserve`, {
            option: option,
            passengers: passengers
        })


    public gotoTrains = (): void => {
        this.router.navigate(['rail', 'trains'], {
            queryParams: {
                from: this._search.fromCity,
                to: this._search.toCity,
                date: this._search.departDate,
                //t0: this._search.hourFrom,
                //t1: this._search.hourTo
            }
        });
    }

    public gotoCars = (sessionId: string, optionRef: number): void => {
        this.router.navigate(['rail', 'cars'], {
            queryParams: {
                sessionId: sessionId,
                optionRef: optionRef.toString()
            }
        });
    }

    public gotoOrder = (sessionId: string, trainRef: number, optionRef: number): void => {
        this.router.navigate(['rail', 'order'], {
            queryParams: {
                sessionId: sessionId,
                trainRef: trainRef.toString(),
                optionRef: optionRef.toString()
            }
        });
    }
}
