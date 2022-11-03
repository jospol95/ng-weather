import {NgModule} from '@angular/core';
import {LocationService} from './location.service';
import {WeatherService} from './weather.service';


@NgModule({
    providers: [LocationService, WeatherService]
})
export class ServicesModule {
}
