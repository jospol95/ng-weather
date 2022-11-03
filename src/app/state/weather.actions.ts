import {Action} from '@ngrx/store';
import {CurrentForecast} from '../types/current-forecast.type';

export enum WeatherActionTypes {
    InitialLoad = 'INIT LOAD',
    Load = 'LOAD',
    LoadSuccess = 'LOAD SUCCESS',
    LoadError = 'LOAD ERROR',
    Update = 'UPDATE',
    UpdateSuccess = 'UPDATE SUCCESS',
    InitialLoadSuccess = 'INIT LOAD SUCCESS',
    RemoveForecast = 'REMOVE FORECAST',

}

export class UpdateSuccess implements Action {
    readonly type = WeatherActionTypes.UpdateSuccess;

    constructor(public payload: { currentForecast: CurrentForecast, index: number, zipcode: string }) {
    }
}

export class UpdateWeather implements Action {
    readonly type = WeatherActionTypes.Update;
    constructor(public payload: { index: number, zipcode: string, countryCode: string }) {
    }
}

export class RemoveWeatherCityForecast implements Action {
    readonly type = WeatherActionTypes.RemoveForecast;
    constructor(public payload: { index: number }) {
    }
}

export class LoadWeather implements Action {
    readonly type = WeatherActionTypes.Load;
    constructor(public payload: { zipcode: string, country: string }) {
    }
}

export class InitWeather implements Action {
    //new loadable with default.
    readonly type = WeatherActionTypes.InitialLoad;
    constructor(public payload: { zipcode: string, country: string }) {
    }
}

export class LoadWeatherSuccess implements Action {
    readonly type = WeatherActionTypes.LoadSuccess;
    constructor(public payload: { currentForecast: CurrentForecast, zipcode: string }) {
    }
}

export class LoadWeatherError implements Action {
    readonly type = WeatherActionTypes.LoadError;
    constructor(public error: any) {
    }
}

export class InitWeatherLoadSuccess implements Action {
    readonly type = WeatherActionTypes.InitialLoadSuccess;
    constructor(public payload: { currentForecast: CurrentForecast, zipcode: string }) {
    }
}


export type NewWeatherActionUnion = InitWeather | UpdateWeather | UpdateSuccess
    | LoadWeather | LoadWeatherSuccess | LoadWeatherError | InitWeatherLoadSuccess
    | RemoveWeatherCityForecast
