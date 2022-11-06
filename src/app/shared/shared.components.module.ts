import {NgModule} from '@angular/core';
import {AutoCompleteComponent} from './components/auto-complete/auto-complete.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SearchFilterPipe} from './pipes/filter-pipe';
import {HighlightSearchPipe} from './pipes/highlight-search';
import {ClickOutsideDirective} from './directives/auto-complete.directive';
import {NgClass, NgForOf, NgIf, NgTemplateOutlet} from '@angular/common';
import {CustomThreeButtonStateComponent} from './components/custom-three-state-button/custom-three-button-state.component';
import {ButtonLoaderIconDirective} from './directives/loader-button.directive';


@NgModule({
    declarations: [
        AutoCompleteComponent,
        SearchFilterPipe,
        ClickOutsideDirective,
        HighlightSearchPipe,
        CustomThreeButtonStateComponent,
        ButtonLoaderIconDirective
    ],
    imports: [
        ReactiveFormsModule,
        NgForOf,
        NgIf,
        NgTemplateOutlet,
        NgClass,
    ],
    exports: [
        AutoCompleteComponent,
        CustomThreeButtonStateComponent,
        ButtonLoaderIconDirective
    ]
})
export class SharedComponentsModule {
}
