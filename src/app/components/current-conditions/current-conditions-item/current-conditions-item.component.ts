import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CurrentForecast} from '../../../types/current-forecast.type';
import {WeatherService} from '../../../services/weather.service';
import {interval, Subscription, timer} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-current-conditions-item',
    templateUrl: './current-conditions-item.component.html',
    styleUrls: ['./current-conditions-item.component.css']
})

export class CurrentConditionsItemComponent implements OnInit, OnDestroy{
    @Input() public item: CurrentForecast
    @Input() public index: number
    @Input() public updateEvery: number = 30000;
    @Output() public removeFromStateEvent = new EventEmitter<number>();
    @Output() public updateWeatherEvent = new EventEmitter<{index: number, zipcode: string, countryCode: string }>();

    updatePoll: Subscription;
    constructor(public weatherService: WeatherService) {
    }

    ngOnInit(): void {
        this.updatePoll = timer(this.updateEvery, this.updateEvery)
            .subscribe(
                () => this.updateWeatherEvent.emit({index: this.index, zipcode: this.item.zipcode, countryCode: this.item.sys.country}));
    }

    removeFromState() {
        this.updatePoll.unsubscribe();
        this.removeFromStateEvent.emit(this.index);
    }

    ngOnDestroy(): void {
        this.updatePoll.unsubscribe();
    }

}
