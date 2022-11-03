import {NgModule} from '@angular/core';

import {ForecastsListComponent} from './forecasts-list/forecasts-list.component';
import {CurrentConditionsComponent} from './current-conditions/current-conditions.component';
import {CurrentConditionsItemComponent} from './current-conditions/current-conditions-item/current-conditions-item.component';
import {AsyncPipe, DatePipe, DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ZipcodeEntryComponent} from './zipcode-entry/zipcode-entry.component';
import {SharedComponentsModule} from '../shared/shared.components.module';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        ForecastsListComponent,
        CurrentConditionsComponent,
        CurrentConditionsItemComponent,
        ZipcodeEntryComponent],
    imports: [
        AsyncPipe,
        RouterModule,
        DecimalPipe,
        SharedComponentsModule,
        NgForOf,
        NgIf,
        DatePipe,
        FormsModule,
    ],
    exports: [
        CurrentConditionsComponent,
        ZipcodeEntryComponent
    ]
})
export class WeatherComponentsModule {
}
