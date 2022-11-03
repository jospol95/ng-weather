import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {LocationService} from '../../services/location.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Weather} from '../../state/weather';
import {InitWeather, LoadWeather, RemoveWeatherCityForecast, UpdateWeather} from '../../state/weather.actions';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-current-conditions',
    templateUrl: './current-conditions.component.html',
    styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit, OnDestroy{
    //Update weather tile in XXX miliseconds.
    @Input() updateEvery: number;
    locationForecast$: Observable<Weather>;

    constructor(private weatherService: WeatherService,
                private locationService: LocationService,
                private router: Router,
                private store: Store<{ weather: Weather }>) {
        this.locationForecast$ = this.store.select(state => state.weather);

    }

    ngOnInit(): void {
        this.initState();
    }

    initState(){
        this.locationService.locationsV2.forEach((loc) => {
            const action = new InitWeather({zipcode: loc.zipcode, country: loc.country});
            this.store.dispatch(action);
        });
    }

    updateWeather($event: {index: number, zipcode: string, countryCode: string}){
        console.log('time');
        const action = new UpdateWeather({index: $event.index, zipcode: $event.zipcode, countryCode: $event.countryCode});
        this.store.dispatch(action);
    }

    removeCurrentForecast(index: number){
        const action = new RemoveWeatherCityForecast({index});
        this.locationService.removeLocationFromStorage(index);
        this.store.dispatch(action);
    }

    ngOnDestroy(): void {
        //Cleaning state
        this.locationService.locationsV2.forEach((value, index) => {
            const action = new RemoveWeatherCityForecast({index});
            this.store.dispatch(action);
        })
    }



}
