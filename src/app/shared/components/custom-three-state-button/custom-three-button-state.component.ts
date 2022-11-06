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

export class CustomThreeButtonStateComponent implements OnInit, OnChanges {

    @Input() resetAfter = 500;
    @Input() initialTemplate: TemplateRef<any>;
    @Input() loadingTemplate: TemplateRef<any>;
    @Input() doneTemplate: TemplateRef<any>;
    @Input() loadable: Loadable;
    @Input() loadingClass: string = 'lighter'
    @Input() initialClass: string;
    @Input() doneClass: string;
    @Output() mainClickEvent = new EventEmitter();
    @ViewChild('parentButton') parentButton: ElementRef;
    ngClassObj: any;

    currentTemplate: TemplateRef<any>;

    ngOnInit() {
        this.currentTemplate = this.initialTemplate;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!changes.loadable.currentValue.loading && !changes.loadable.currentValue.success) {
            //Active state
            this.setActive();
        }
        if (changes.loadable.currentValue.loading) {
            //Loading state
           this.setLoading();
        }
        if (changes.loadable.currentValue.success) {
            //Done state
            this.setDone();
            setTimeout(() => {
                this.setActive();
            }, this.resetAfter);

        }
    }

    triggerAction() {
        this.mainClickEvent.emit();
        // this.action$.subscribe(() => this.currentTemplate = this.doneTemplate);
    }

    private setActive(){
        this.currentTemplate = this.initialTemplate;
        this.ngClassObj = this.initialClass;
        if(this.parentButton){
            this.parentButton.nativeElement.disabled = false;
        }
    }

    private setLoading(){
        this.currentTemplate = this.loadingTemplate;
        this.ngClassObj = this.initialClass + this.loadingClass;
        this.parentButton.nativeElement.disabled = true;
    }

    private setDone(){
        this.currentTemplate = this.doneTemplate;
        this.ngClassObj = this.doneClass;
        this.parentButton.nativeElement.disabled = true;
    }

}
