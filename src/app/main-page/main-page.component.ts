import { Component } from '@angular/core';
import {LoadWeather} from '../state/weather.actions';
import {Store} from '@ngrx/store';
import {Weather} from '../state/weather';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent {

    news$: Observable<Weather>;
    constructor(private store: Store<{weather: Weather}>) {
        this.news$ = this.store.select(state => state.weather);
    }

    load() {
        // const action = new LoadWeather({});
        // this.store.dispatch(action);
    }
}
