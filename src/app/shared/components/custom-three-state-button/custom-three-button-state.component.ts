import {
    AfterViewInit,
    Attribute,
    Component, ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild
} from '@angular/core';
import {timer} from 'rxjs';
import {Loadable} from '../../../state/loadable';

@Component({
    selector: 'state-btn-component',
    templateUrl: 'custom-three-button-state.component.html',
    styleUrls: ['./custom-three-button-state.component.css']
})

export class CustomThreeButtonStateComponent implements OnInit, OnChanges, AfterViewInit {
    ngAfterViewInit(): void {
        this.parentButton.nativeElement.classList.add('btn');
        this.parentButton.nativeElement.classList.add('btn-primary');
    }
    @Input() resetAfter = 500;
    @Input() initialTemplate: TemplateRef<any>;
    @Input() loadingTemplate: TemplateRef<any>;
    @Input() doneTemplate: TemplateRef<any>;
    @Input() loadable: Loadable;
    @Output() mainClickEvent = new EventEmitter();
    @ViewChild('parentButton') parentButton: ElementRef;

    currentTemplate: TemplateRef<any>;

    ngOnInit() {
        this.currentTemplate = this.initialTemplate;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!changes.loadable.currentValue.loading && !changes.loadable.currentValue.success) {
            //Active state
            this.currentTemplate = this.initialTemplate;
        }
        if (changes.loadable.currentValue.loading) {
            //Loading state
            this.currentTemplate = this.loadingTemplate;
        }
        if (changes.loadable.currentValue.success) {
            //Done state
            this.currentTemplate = this.doneTemplate;
            setTimeout(() => {
                this.currentTemplate = this.initialTemplate;
            }, this.resetAfter);

        }
    }

    triggerAction() {
        this.mainClickEvent.emit();
        // this.action$.subscribe(() => this.currentTemplate = this.doneTemplate);
    }
}
