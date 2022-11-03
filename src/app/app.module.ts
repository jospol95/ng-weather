import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {LocationService} from './services/location.service';
import {WeatherService} from './services/weather.service';
import {MainPageComponent} from './main-page/main-page.component';
import {RouterModule} from '@angular/router';
import {routing} from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {StoreModule} from '@ngrx/store';
import {weatherReducer} from './state/weather';
import {EffectsModule} from '@ngrx/effects';
import {WeatherEffects} from './state/weather.effects';
import {SharedComponentsModule} from './shared/shared.components.module';
import {WeatherComponentsModule} from './components/weather.components.module';

@NgModule({
    declarations: [
        AppComponent,
        MainPageComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        routing,
        StoreModule.forRoot({weather: weatherReducer}),
        EffectsModule.forRoot([WeatherEffects]),
        ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
        SharedComponentsModule,
        WeatherComponentsModule,
    ],
    exports: [],
    providers: [LocationService, WeatherService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
