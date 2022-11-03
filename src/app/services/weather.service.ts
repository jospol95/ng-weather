import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {CurrentForecast} from '../types/current-forecast.type';
import {CountryEnum} from '../types/country.enum';


@Injectable()
export class WeatherService {
    static URL = 'https://api.openweathermap.org/data/2.5';
    static APPID = '5a4b2d457ecbef9eb2a71e480b947604';
    static ICON_URL = 'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';

    constructor(private http: HttpClient) {
    }

    getCurrentForecast(zipcode: string, country: string): Observable<CurrentForecast> {
        const countryCode  = this.getEnumKeyByEnumValue(CountryEnum, country);
        return this.http.get<CurrentForecast>(`${WeatherService.URL}/weather?zip=${zipcode},${countryCode}&units=imperial&APPID=${WeatherService.APPID}`);
    }

    updateCurrentForecast(zipcode: string, countryCode: string): Observable<CurrentForecast> {
        return this.http.get<CurrentForecast>(`${WeatherService.URL}/weather?zip=${zipcode},${countryCode}&units=imperial&APPID=${WeatherService.APPID}`);

    }

    getForecast(zipcode: string, countryCode: string): Observable<any> {
        return this.http.get(`${WeatherService.URL}/forecast/daily?zip=${zipcode},${countryCode}&units=imperial&cnt=5&APPID=${WeatherService.APPID}`);

    }

    getWeatherIcon(id) {
        if (id >= 200 && id <= 232) {
            return WeatherService.ICON_URL + 'art_storm.png';
        } else if (id >= 501 && id <= 511) {
            return WeatherService.ICON_URL + 'art_rain.png';
        } else if (id === 500 || (id >= 520 && id <= 531)) {
            return WeatherService.ICON_URL + 'art_light_rain.png';
        } else if (id >= 600 && id <= 622) {
            return WeatherService.ICON_URL + 'art_snow.png';
        } else if (id >= 801 && id <= 804) {
            return WeatherService.ICON_URL + 'art_clouds.png';
        } else if (id === 741 || id === 761) {
            return WeatherService.ICON_URL + "art_fog.png";
        } else {
            return WeatherService.ICON_URL + "art_clear.png";
        }
    }

    getEnumKeyByEnumValue(myEnum, enumValue) {
        let keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
        return keys.length > 0 ? keys[0] : null;
    }
}
