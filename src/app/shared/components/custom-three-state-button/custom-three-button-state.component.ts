import {Attribute, Component, HostBinding, Input, OnInit, TemplateRef} from '@angular/core';
import {timer} from 'rxjs';

@Component({
    selector: 'state-btn-component',
    templateUrl: 'custom-three-button-state.component.html',
    styleUrls: ['./custom-three-button-state.component.css']
})

export class CustomThreeButtonStateComponent implements OnInit {
    action$ = timer(2000);
    @Input()
    initialTemplate: TemplateRef<any>;
    @Input()
    loadingTemplate: TemplateRef<any>;
    @Input()
    doneTemplate: TemplateRef<any>;
    currentTemplate: TemplateRef<any>;

    ngOnInit() {
        this.currentTemplate = this.initialTemplate;
    }

    triggerAction() {
        this.currentTemplate = this.loadingTemplate;
        this.action$.subscribe(() => this.currentTemplate = this.doneTemplate);
    }
}
