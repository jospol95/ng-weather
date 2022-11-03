import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Loadable} from '../../../state/loadable';
import {delay} from 'rxjs/operators';

@Component({
    selector: 'state-button-component',
    templateUrl: './state-button.component.html',
    styleUrls: ['./state-button.component.css']
})

export class StateButtonComponent implements OnChanges {
    @Input() loadable: Loadable;
    @Input() defaultColor: color = 'primary';
    @Input() defaultText = 'Add';
    @Input() loadingColor: color = 'primary'
    @Input() loadingText = 'Adding...';
    @Input() completedText = 'Done';
    @Input() completedColor: color = 'success';
    @Input() resetAfter = 500;
    @Input() mainClickDisabled = false;
    @Output() mainClickEvent = new EventEmitter();
    public active: boolean;
    public completed: boolean;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!changes.loadable.currentValue.loading && !changes.loadable.currentValue.success) {
            this.active = true;
            this.completed = false;
        }
        if (changes.loadable.currentValue.loading) {
            this.active = false;
            this.completed = false;
        }
        if (changes.loadable.currentValue.success) {
            this.active = false;
            this.completed = true;
            setTimeout(() => {
                this.active = true;
                this.completed = false;
            }, this.resetAfter);

        }
    }
}

type color = 'primary' | 'success' | 'default' | 'secondary'
