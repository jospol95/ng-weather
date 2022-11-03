import {catchError, concatMap, delay, map, switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {
    InitWeather, InitWeatherLoadSuccess,
    LoadWeather,
    LoadWeatherError,
    LoadWeatherSuccess, RemoveWeatherCityForecast,
    UpdateSuccess,
    UpdateWeather,
    WeatherActionTypes
} from './weather.actions';
import {WeatherService} from '../services/weather.service';
import {CurrentForecast} from '../types/current-forecast.type';

function mockApiResponse(): Observable<{ currentForecast: string }> {
    return of({
        currentForecast: 'daily forecast'
    }).pipe(
        delay(1000)
    );
}

@Injectable()
export class WeatherEffects {

    constructor(private actions$: Actions, private weatherService: WeatherService) {
    }

    @Effect ()
    loadCurrentForecast = this.actions$.pipe(
        ofType<LoadWeather>(WeatherActionTypes.Load),
        switchMap((action) => {
            return this.weatherService.getCurrentForecast(action.payload.zipcode, action.payload.country).pipe(
                map((response: CurrentForecast) => new LoadWeatherSuccess(
                    {currentForecast: response, zipcode: action.payload.zipcode})),
                catchError(error => of(new LoadWeatherError(error)))
            );
        }),
    );

    @Effect ()
    initCurrentForecast = this.actions$.pipe(
        ofType<InitWeather>(WeatherActionTypes.InitialLoad),
        concatMap((action) => {
            return this.weatherService.getCurrentForecast(action.payload.zipcode, action.payload.country).pipe(
                map((response: CurrentForecast) => new InitWeatherLoadSuccess(
                    {currentForecast: response, zipcode: action.payload.zipcode})),
                catchError(error => of(new LoadWeatherError(error)))
            );
        }),
    );

    @Effect()
    updateCurrentForecast = this.actions$.pipe(
        ofType<UpdateWeather>(WeatherActionTypes.Update),
        concatMap((action) => {
            return this.weatherService.updateCurrentForecast(action.payload.zipcode, action.payload.countryCode).pipe(
                map((response: CurrentForecast) => new UpdateSuccess(
                    {currentForecast: response, index: action.payload.index, zipcode: action.payload.zipcode})),
                catchError(error => of(new LoadWeatherError(error)))
            );
        }),
    );

    @Effect()
    removeCurrentForecast = this.actions$.pipe(
        ofType<RemoveWeatherCityForecast>(WeatherActionTypes.RemoveForecast),
        concatMap((action) => {
            return of().pipe(
                map(() => new RemoveWeatherCityForecast({index: action.payload.index}))
            )
        }),
    );

}
