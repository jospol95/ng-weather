import {NgModule} from '@angular/core';
import {AutoCompleteComponent} from './components/auto-complete/auto-complete.component';
import {StateButtonComponent} from './components/state-button/state-button.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SearchFilterPipe} from './pipes/filter-pipe';
import {HighlightSearchPipe} from './pipes/highlight-search';
import {ClickOutsideDirective} from './directives/auto-complete.directive';
import {NgForOf, NgIf} from '@angular/common';


@NgModule({
    declarations: [
        AutoCompleteComponent,
        SearchFilterPipe,
        ClickOutsideDirective,
        HighlightSearchPipe,
        StateButtonComponent],
    imports: [
        ReactiveFormsModule,
        NgForOf,
        NgIf,
    ],
    exports: [
        AutoCompleteComponent,
        StateButtonComponent
    ]
})
export class SharedComponentsModule {
}
